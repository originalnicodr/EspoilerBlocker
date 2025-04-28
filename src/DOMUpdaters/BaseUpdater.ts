import { EspnSpoilerBlocker } from '../EspnSpoilerBlocker';
import { getHighlightType, VideoHighlightType } from '../utils/getHighlightType';
import { getTeamsByTitle } from '../utils/getTeamsByTitle';
import { Settings } from '../utils/settings';

export class BaseUpdater {
  protected originalState: {
    titleTextContent?: string;
    containerDisplayStyle?: string;
  } = {};
  protected originalStyles = {};

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

  protected is_being_spoiler_blocked: boolean = true;

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
    console.log('is_being_spoiler_blocked: ', this.is_being_spoiler_blocked);
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
      //this.match_date = this.getMatchDate(this.aria_text);
      // Since YouTube seemed to have removed the complete aria-text that included the exact date the video went live,
      // we are nullifying this value for now, at least until we have a new way of getting a date
      this.match_date = null;
    }
  }

  private getMatchDate(aria_text: string): Date | null {
    const relative_time = this.extractRelativeTimeText(aria_text);
    if (!relative_time) return null;
    return this.parseRelativeTimeString(relative_time);
  }
  
  private extractRelativeTimeText(aria_text: string): string | null {
    if (aria_text.includes('hace ')) {
      // Spanish: extract everything after "hace"
      return aria_text.split('hace ').pop()?.trim() || null;
    } else if (aria_text.includes(' ago')) {
      // English: extract everything before "ago"
      const parts = aria_text.split(' ago');
      return parts[0]?.trim() || null;
    } else {
      // Attempt to get date data from the visual HTMLElement
      const metadata_list: NodeListOf<HTMLElement> = this.container.querySelectorAll(
        ".inline-metadata-item.style-scope.ytd-video-meta-block"
      );
      if (metadata_list.length > 1) {
        return metadata_list[1].innerText.trim();
      }
      return null;
    }
  }
  
  private parseRelativeTimeString(relative_time: string): Date {
    let years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0;
  
    const unit_setters = { years, months, days, hours, minutes, seconds };
  
    const time_units_map: { [unit: string]: keyof typeof unit_setters } = {
      // Spanish
      'año': 'years', 'años': 'years',
      'mes': 'months', 'meses': 'months',
      'día': 'days', 'días': 'days',
      'hora': 'hours', 'horas': 'hours',
      'minuto': 'minutes', 'minutos': 'minutes',
      'segundo': 'seconds', 'segundos': 'seconds',
      // English
      'year': 'years', 'years': 'years',
      'month': 'months', 'months': 'months',
      'day': 'days', 'days': 'days',
      'hour': 'hours', 'hours': 'hours',
      'minute': 'minutes', 'minutes': 'minutes',
      'second': 'seconds', 'seconds': 'seconds',
    };
  
    const all_units = Object.keys(time_units_map).join('|');
    const duration_regex = new RegExp(`(\\d+)\\s*(${all_units})`, 'gi');
  
    let match: RegExpExecArray;
    while ((match = duration_regex.exec(relative_time)) !== null) {
      const value = parseInt(match[1]);
      const unit_key = time_units_map[match[2].toLowerCase()];
      if (unit_key) {
        unit_setters[unit_key] += value;
      }
    }
  
    const match_date = new Date();
    match_date.setFullYear(match_date.getFullYear() - unit_setters.years);
    match_date.setMonth(match_date.getMonth() - unit_setters.months);
    match_date.setDate(match_date.getDate() - unit_setters.days);
    match_date.setHours(match_date.getHours() - unit_setters.hours - 2); // Offset for upload delay
    match_date.setMinutes(match_date.getMinutes() - unit_setters.minutes);
    match_date.setSeconds(match_date.getSeconds() - unit_setters.seconds);
  
    return match_date;
  }  

  protected async shouldBlockSpoiler(): Promise<boolean> {
    if (!this.is_espn_video || this.highlight_type === VideoHighlightType.None || this.already_watched) {
      this.is_being_spoiler_blocked = false;
      return false;
    }

    const settings: Settings = await this.loadSettings();
    if (this.highlight_type === VideoHighlightType.Basketball && !settings.block_spoilers_basketball) {
      this.is_being_spoiler_blocked = false;
      return false;
    }

    if (this.highlight_type === VideoHighlightType.Football && !settings.block_spoilers_football) {
      this.is_being_spoiler_blocked = false;
      return false;
    }

    if (settings.block_spoilers_expiration_days) {
      const now = new Date();
      const expiration_date = new Date();
      expiration_date.setDate(now.getDate() - settings.block_spoilers_expiration_days);
      if (expiration_date > this.match_date) {
        //this.is_being_spoiler_blocked = false;
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
          display_total_score: Boolean(data.value),
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

  public backupOriginal() {
    if (!this.container) return;

    this.originalState.titleTextContent = this.title?.textContent || '';
    this.originalState.containerDisplayStyle = (this.container as HTMLElement).style.display;
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
        this.is_being_spoiler_blocked = true;
        this.update();
        break;
      case 'removeSpoilerBlockers':
        this.is_being_spoiler_blocked = false;
        this.restoreSpoilers();
        break;
      case 'updatedBasketballSetting':
        // WIP
        /*
        if (this.highlight_type === VideoHighlightType.Basketball) {
          if (message.value && !this.is_being_spoiler_blocked) {
            this.is_being_spoiler_blocked = true;
            this.update();
          } else if (!message.value && this.is_being_spoiler_blocked) {
            this.is_being_spoiler_blocked = false;
            this.restoreSpoilers();
          }
        }
        */
        break;
      case 'updatedFootballSetting':
        // WIP
        /*
        if (this.highlight_type === VideoHighlightType.Football) {
          if (message.value && !this.is_being_spoiler_blocked) {
            console.log('Adding spoiler blockers');
            this.is_being_spoiler_blocked = true;
            this.update();
          } else if (!message.value && this.is_being_spoiler_blocked) {
            console.log('Removing spoiler blockers');
            this.is_being_spoiler_blocked = false;
            this.restoreSpoilers();
          }
        }
        */
        break;
      case 'updatedExpirationDaysSetting':
        break;
      case 'updatedScoresSetting':
        break;
    }
  }

  public restoreSpoilers() {
    if (this.title && this.originalState.titleTextContent !== undefined) {
      this.title.textContent = this.originalState.titleTextContent;
      this.title.innerText = this.originalState.titleTextContent;
    }
  
    if (this.originalState.containerDisplayStyle !== undefined) {
      (this.container as HTMLElement).style.display = this.originalState.containerDisplayStyle;
    }
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

