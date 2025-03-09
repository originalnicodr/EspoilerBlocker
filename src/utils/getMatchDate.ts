// TODO: Try to parse this in English in case the user's YouTube language is not Spanish
export function getMatchDate(aria_text: string): Date {
    // aria_text have the following format "{video_title} {views} visualizaciones hace {d} día {m} minutos y {s} segundos"
    let parts: string[] = aria_text.split('hace');
    let time_passed: string = parts[parts.length - 1].trim();
    let years: number = 0, months: number = 0, days: number = 0, hours: number = 0, minutes: number = 0, seconds: number = 0;
    const spanish_duration_regex: RegExp = /(\d+)\s*(año(s)?|mes(es)?|día(s)?|hora(s)?|minuto(s)?|segundo(s)?)\b/g;

    let match: RegExpExecArray;
    while ((match = spanish_duration_regex.exec(time_passed)) !== null) {
      const value: number = parseInt(match[1]);
      const unit: string = match[2];
  
      if (unit === 'año' || unit === 'años') years = value;
      if (unit === 'mes' || unit === 'meses') months = value;
      if (unit === 'día' || unit === 'días') days = value;
      if (unit === 'hora' || unit === 'horas') hours = value;
      if (unit === 'minuto' || unit === 'minutos') minutes = value;
      if (unit === 'segundo' || unit === 'segundos') seconds = value;
    }

    const match_date: Date = new Date();
    match_date.setFullYear(match_date.getFullYear() - years);
    match_date.setMonth(match_date.getMonth() - months);
    match_date.setDate(match_date.getDate() - days);
    match_date.setHours(match_date.getHours() - hours);
    match_date.setMinutes(match_date.getMinutes() - minutes); 
    match_date.setSeconds(match_date.getSeconds() - seconds);
    // This is actually the video publication time, but because of highlights that are uploaded after 00:00 it makes sense to offset it by a couple of hours
    match_date.setHours(match_date.getHours() - 2);  
    return match_date;
  }
