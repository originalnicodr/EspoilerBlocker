export enum VideoHighlightType {
    None,
    Football,
    Basketball,
  }

// This is a dumb heuristic that we came up with to identify what type of highlight it is.
// Maybe using the team's names would be more precise, but we don't really target
// basketball highlights, being able to cover them is just a side effect of our system.
export function getHighlightType(total_goals: number): VideoHighlightType {
    if (total_goals > 20) {
        return VideoHighlightType.Basketball;
    }
    return VideoHighlightType.Football;
  }
  