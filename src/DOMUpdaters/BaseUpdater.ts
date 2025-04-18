import { EspnSpoilerBlocker } from '../EspnSpoilerBlocker';
import { getHighlightType, VideoHighlightType } from '../utils/getHighlightType';
import { getTeamsByTitle } from '../utils/getTeamsByTitle';
import { Settings } from '../utils/settings';

export class BaseUpdater {
  protected elementToEdit: Element;
  private originalStyles = {};

  protected container: HTMLElement;
  protected title: HTMLElement;
  protected aria_text: string;

  protected spoiler_blocked_title_text: string = '';

  protected is_espn_video: boolean = false;
  protected already_watched: boolean = false;

  // Metadata
  protected total_score: number;
  protected highlight_type: VideoHighlightType;
  protected team_a: string;
  protected team_b: string;
  protected match_date: Date;

  protected is_being_spoiler_blocked: boolean = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.markElement();
    this.subscribeToMessages();

    this.retrieveUpdaterData();
  }

  protected retrieveUpdaterData() {
    this.title = this.getTitle();
    this.aria_text = this.getAriaText();

    this.already_watched = this.getIfAlreadyWatched();
    // We do this afterwards because some implementations might use the title
    this.is_espn_video = this.getIsESPNVideo();

    this.retrieveUpdaterMetadata();
  }

  protected debugPrintMembers() {
    console.log('-----------------------');
    console.log('container: ', this.container);
    console.log('title: ', this.title);
    console.log('aria_text: ', this.aria_text);
    console.log('is_espn_video: ', this.is_espn_video);
    console.log('already_watched: ', this.already_watched);
    console.log('total_score: ', this.total_score);
    console.log('highlight_type: ', this.highlight_type);
    console.log('team_a: ', this.team_a);
    console.log('team_b: ', this.team_b);
    console.log('match_date: ', this.match_date);
  }

  protected getIsESPNVideo(): boolean {
    throw new Error('getIsESPNVideo method not implemented');
  }

  protected getChannel(): string {
    throw new Error('getChannel method not implemented');
  }

  protected getIfAlreadyWatched(): boolean {
    throw new Error('getIfAlreadyWatched method not implemented');
  }

  protected getAriaText(): string {
    throw new Error('getAriaText method not implemented');
  }

  protected getTitle(): HTMLElement {
    throw new Error('getTitle method not implemented');
  }

  private retrieveUpdaterMetadata() {
    const title_text: string = this.getTitleText();

    if (
      typeof title_text === 'undefined' ||
      !title_text.includes('|') ||
      !title_text.includes('-') ||
      !this.canBlockTitleSpoiler(title_text)
    ) {
      this.highlight_type = VideoHighlightType.None;
    } else {
      this.total_score = getTotalGoals(title_text);
      this.highlight_type = getHighlightType(this.total_score);

      const teams: string[] = getTeamsByTitle(title_text);
      if (teams.length === 0) {
        return;
      }
      [this.team_a, this.team_b] = teams as [string, string];
    }

    if (this.aria_text) {
      this.match_date = getMatchDate(this.aria_text);
    }
  }

  protected async shouldBlockSpoiler(): Promise<boolean> {
    if (!this.is_espn_video || this.highlight_type === VideoHighlightType.None || this.already_watched) {
      return false;
    }

    const settings: Settings = await this.loadSettings();
    if (this.highlight_type === VideoHighlightType.Basketball && !settings.block_spoilers_basketball) {
      return false;
    }

    if (this.highlight_type === VideoHighlightType.Football && !settings.block_spoilers_football) {
      return false;
    }

    if (settings.block_spoilers_expiration_days) {
      const now = new Date();
      const expiration_date = new Date();
      expiration_date.setDate(now.getDate() - settings.block_spoilers_expiration_days);
      if (expiration_date > this.match_date) {
        return false;
      }
    }

    return true;
  }

  protected async loadSettings(): Promise<Settings> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(null, function (data) {
        resolve({
          block_spoilers_basketball: Boolean(data.basketball),
          block_spoilers_football: Boolean(data.football),
          block_spoilers_expiration_days: data.hasOwnProperty('expirationDays') ? data.expirationDays : '',
          display_total_score: Boolean(data.displayScores),
        });
      });
    });
  }

  protected blockTitleSpoiler(original_title: string): string {
    const teams: string[] = getTeamsByTitle(original_title);
    if (teams.length === 0) {
      return '';
    }

    const [team_a, team_b] = teams as [string, string];
    return team_a + ' vs ' + team_b;
  }

  protected canBlockTitleSpoiler(original_title: string): boolean {
    return this.blockTitleSpoiler(original_title) !== '';
  }

  public static isElementAlreadyBeingWatched(element: HTMLElement) {
    return element.classList.contains(EspnSpoilerBlocker.ADDED_CLASS_TO_MARK_AS_WATCHED);
  }

  public async update(...args: any[]) {
    throw new Error('update method not implemented');
  }

  public removeChanges() {
    this.removeChanges();
  }

  public duplicateElement() {
    if (this.elementToEdit) {
      this.elementToEdit.remove();
    }

    // duplicate the element and edit this one
    this.elementToEdit = this.container.cloneNode(true) as Element;
    this.container.insertAdjacentElement('afterend', this.elementToEdit);
    this.elementToEdit.classList.add(EspnSpoilerBlocker.ADDED_CLASS_TO_MARK_AS_ADDED);

    // hide original element
    const style = (this.container as HTMLDivElement).style;
    style.display = 'none';
  }

  public markElement() {
    this.container.classList.add(EspnSpoilerBlocker.ADDED_CLASS_TO_MARK_AS_WATCHED);

    const style = (this.container as HTMLDivElement).style;

    this.originalStyles = { display: style.display };
  }

  public unmarkElement() {
    this.container.classList.remove(EspnSpoilerBlocker.ADDED_CLASS_TO_MARK_AS_WATCHED);

    const style = (this.container as HTMLDivElement).style;
    Object.entries(this.originalStyles).forEach(([key, value]) => {
      style[key] = value;
    });
  }

  protected getTitleText(): string {
    return this.title ? this.title.textContent.trim() || this.title.innerText.trim() : '';
  }

  private subscribeToMessages() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
    });
  }

  // TODO
  // Maybe just append restoreSpoilers() and update() calls? Maybe doing so would make spoilers visible a microsecond and we wouldn't want that
  protected handleMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) {
    switch (message.action) {
      case 'enableSpoilerBlockers':
        this.update();
        break;
      case 'removeSpoilerBlockers':
        if (this.is_being_spoiler_blocked) {
          this.restoreSpoilers();
        }
        break;
      case 'updatedBasketballSetting':
        break;
      case 'updatedFootballSetting':
        break;
      case 'updatedExpirationDaysSetting':
        break;
      case 'updatedScoresSetting':
        break;
    }
  }

  protected restoreSpoilers() {
    // TODO
  }

  protected videoTitleContainsSpoilers(): boolean {
    // NOTE: we could use this regex to retrieve groups, goals, and extra info using the named groups.
    // probably we would want to move it to utils
    const regex =
      /(?<summary>.+) \| (?<team1>.+) (?<goalsTeam1>\d+)( \((?<penaltyTeam1>\d+)\)-\((?<penaltyTeam2>\d+)\))? ?-? ?(?<goalsTeam2>\d+) (?<team2>.+) \| RESUMEN$/;

    return regex.test(this.getTitleText());
  }
}

function getTotalGoals(original_title: string): number {
  const match_teams_string: string = original_title.split('|')[1];
  if (!match_teams_string) {
    return 0;
  }

  if (!match_teams_string.includes('-')) {
    return 0;
  }

  const [part1, part2] = match_teams_string.split('-');
  return Number(part1.trim().split(' ').at(-1)) + Number(part2.trim().split(' ').at(0));
}

// TODO: Try to parse this in English in case the user's YouTube language is not Spanish
function getMatchDate(aria_text: string): Date {
  // aria_text have the following format "{video_title} {views} visualizaciones hace {d} día {m} minutos y {s} segundos"
  const parts: string[] = aria_text.split('hace');
  const time_passed: string = parts[parts.length - 1].trim();
  let years: number = 0,
    months: number = 0,
    days: number = 0,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0;
  const spanish_duration_regex: RegExp = /(\d+)\s*(año|mes|día|hora|minuto|segundo)s?/g;

  let match: RegExpExecArray;
  while ((match = spanish_duration_regex.exec(time_passed)) !== null) {
    const value: number = parseInt(match[1]);
    const unit: string = match[2];

    if (unit === 'año') years = value;
    if (unit === 'mes') months = value;
    if (unit === 'día') days = value;
    if (unit === 'hora') hours = value;
    if (unit === 'minuto') minutes = value;
    if (unit === 'segundo') seconds = value;
  }

  const match_date: Date = new Date();
  match_date.setFullYear(match_date.getFullYear() - years);
  match_date.setMonth(match_date.getMonth() - months);
  match_date.setDate(match_date.getDate() - days);
  match_date.setHours(match_date.getHours() - hours);
  match_date.setMinutes(match_date.getMinutes() - minutes);
  match_date.setSeconds(match_date.getSeconds() - seconds);

  // Gets video publication time, because of matches which highlights are uploaded after 00:00 it makes sense to offset it by a couple of hours
  match_date.setHours(match_date.getHours() - 2);
  return match_date;
}
