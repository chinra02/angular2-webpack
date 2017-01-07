
export class SmartTableSelectionData {

  constructor(private id: string, private selected: boolean) { }

  getId(): string {
    return this.id;
  }

  isSelected(): boolean {
    return this.selected;
  }

  setSelected(selected: boolean): void {
    this.selected = selected;
  }

}