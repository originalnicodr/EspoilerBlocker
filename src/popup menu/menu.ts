class ExtensionMenu {
    private basketball_checkbox: HTMLInputElement;
    private football_checkbox: HTMLInputElement;
    private expiration_days_input: HTMLInputElement;
    private remove_spoiler_blockers_button: HTMLButtonElement;
    private display_scores_checkbox: HTMLInputElement;

    private spoiler_blockers_enabled: boolean = true;
  
    constructor() {
      this.basketball_checkbox = document.getElementById("checkbox-basketball") as HTMLInputElement;
      this.football_checkbox = document.getElementById("checkbox-football") as HTMLInputElement;
      this.expiration_days_input = document.getElementById("expiration-days") as HTMLInputElement;
      this.remove_spoiler_blockers_button = document.getElementById("remove-spoiler-blockers") as HTMLButtonElement;
      this.display_scores_checkbox = document.getElementById("display-scores-checkbox") as HTMLInputElement;
  
      this.loadSettings();
      this.setupEventListeners();
    }
  
    private loadSettings(): void {
      chrome.storage.sync.get(null, (data) => {
        this.basketball_checkbox.checked = data.hasOwnProperty("basketball") ? data.basketball : false;
        this.football_checkbox.checked = data.hasOwnProperty("football") ? data.football : true;
        this.expiration_days_input.value = data.hasOwnProperty("expirationDays") ? data.expirationDays : "";
        this.display_scores_checkbox.checked = data.hasOwnProperty("displayScores") ? data.displayScores : false;
      });
    }
  
    private saveSettings(): void {
      const settings = {
        basketball: this.basketball_checkbox.checked,
        football: this.football_checkbox.checked,
        expirationDays: this.expiration_days_input.value || "",
        displayScores: this.display_scores_checkbox.checked,
      };
  
      chrome.storage.sync.set(settings, () => {
        console.log("Settings saved.");
      });
    }
  
    private sendMessageToAllTabs(message: object): void {
      chrome.tabs.query({}, (tabs) => {
        for (const tab of tabs) {
          if (tab.id !== undefined) {
            chrome.tabs.sendMessage(tab.id, message);
          }
        }
      });
    }
  
    private updateScores(): void {
      this.sendMessageToAllTabs({
        action: "updatedScoresSetting",
        displayScores: this.display_scores_checkbox.checked,
      });
    }
  
    private toggleSpoilerBlockers(): void {
      this.spoiler_blockers_enabled = !this.spoiler_blockers_enabled;
      this.remove_spoiler_blockers_button.textContent = this.spoiler_blockers_enabled
        ? "Remove Spoiler Blockers"
        : "Enable Spoiler Blockers";
        
      // Maybe this one should be sent only to the active window
      this.sendMessageToAllTabs({
        action: this.spoiler_blockers_enabled ? "enableSpoilerBlockers" : "removeSpoilerBlockers",
      });
    }
  
    private setupEventListeners(): void {
      this.basketball_checkbox.addEventListener("change", () => {
        this.saveSettings();
        this.sendMessageToAllTabs({ action: "updatedBasketballSetting" });
      });
  
      this.football_checkbox.addEventListener("change", () => {
        this.saveSettings();
        this.sendMessageToAllTabs({ action: "updatedFootballSetting" });
      });
  
      this.expiration_days_input.addEventListener("input", () => {
        this.saveSettings();
        this.sendMessageToAllTabs({ action: "updatedExpirationDaysSetting" });
      });
  
      this.display_scores_checkbox.addEventListener("change", () => {
        this.saveSettings();
        this.updateScores();
      });
  
      this.remove_spoiler_blockers_button.addEventListener("click", () => {
        this.toggleSpoilerBlockers();
      });
    }
  }

  new ExtensionMenu();
