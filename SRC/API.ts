class API{
	private DOMAIN:string;
	private TOKEN:string;

	constructor(TOKEN_CONST:any, DOMAIN_CONST:string){
		this.DOMAIN = DOMAIN_CONST;
		this.TOKEN = TOKEN_CONST;
	}

	async CREATE_NOTE(TEXT:string){
		fetch("https://" + this.DOMAIN + "/api/notes/create", 
			{
				method:"POST",
				headers:{
					"Content-Type": "application/json"
				},
				body:JSON.stringify({
					i:this.TOKEN,
					localOnly: false,
					noExtractMentions: false,
					noExtractHashtags: false,
					noExtractEmojis: false,
					text: TEXT
				})
			}
		);
	}
}