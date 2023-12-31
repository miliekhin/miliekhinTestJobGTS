export type Level ={
  color: string,
  icon: string,
  text: string,
}
export type Event = {
  id: number,
  responsible: string,
  photoUrl: string,
  text: string,
  hardware: string,
  level: Level,
  time: string,
  isRead: boolean,
  isSelected: boolean,
}

export type ViewValue = {
  icon: string,
  view: string,
}

export type CardFields ={
  time: string,
  level: string,
  hardware: string,
  text: string,
};