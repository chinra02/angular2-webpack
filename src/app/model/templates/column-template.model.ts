export class ColumnTemplateModel {

    private type: string;
    private viewTemplate: string;
    private editTemplate: string;
    private searchTemplate: string;
    private searchDescriptionTemplate: string;
    private viewTemplateHtml: string;
    private editTemplateHtml: string;
    private searchTemplateHtml: string;
    private searchDescriptionTemplateHtml: string;


	public get $viewTemplateHtml(): string {
		return this.viewTemplateHtml;
	}

	public set $viewTemplateHtml(value: string) {
		this.viewTemplateHtml = value;
	}

	public get $editTemplateHtml(): string {
		return this.editTemplateHtml;
	}

	public set $editTemplateHtml(value: string) {
		this.editTemplateHtml = value;
	}

	public get $searchTemplateHtml(): string {
		return this.searchTemplateHtml;
	}

	public set $searchTemplateHtml(value: string) {
		this.searchTemplateHtml = value;
	}

	public get $searchDescriptionTemplateHtml(): string {
		return this.searchDescriptionTemplateHtml;
	}

	public set $searchDescriptionTemplateHtml(value: string) {
		this.searchDescriptionTemplateHtml = value;
	}
    
    public get $viewTemplate(): string {
        return this.viewTemplate;
    }

    public set $viewTemplate(value: string) {
        this.viewTemplate = value;
    }


    public get $editTemplate(): string {
        return this.editTemplate;
    }

    public set $editTemplate(value: string) {
        this.editTemplate = value;
    }


    public get $searchTemplate(): string {
        return this.searchTemplate;
    }

    public set $searchTemplate(value: string) {
        this.searchTemplate = value;
    }

    public get $searchDescriptionTemplate(): string {
        return this.searchDescriptionTemplate;
    }

    public set $searchDescriptionTemplate(value: string) {
        this.searchDescriptionTemplate = value;
    }


    public get $type(): string {
        return this.type;
    }

    public set $type(value: string) {
        this.type = value;
    }


}