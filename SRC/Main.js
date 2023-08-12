const https = require('https');
const fs = require('fs');

let ENV = undefined;
const DAY = ["日", "月", "火", "水", "木", "金", "土"];


try{
	const data = fs.readFileSync('./ENV.json', 'utf8');
	ENV = JSON.parse(data);
}catch(err){
	console.error('ファイル読み込みエラー:', err);
}

function SEND(TEXT){
	const data = JSON.stringify({
		i:ENV.I,
		localOnly: false,
		noExtractMentions: false,
		noExtractHashtags: false,
		noExtractEmojis: false,
		text: TEXT
	});
	
	const options = {
		hostname: "ussr.rumiserver.com",
		port: 443,
		path: "/api/notes/create",
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		}
	};
	
	const req = https.request(options, (res) => {
		let responseData = '';
	
		res.on('data', (chunk) => {
			responseData += chunk;
		});
	
		res.on('end', () => {
			const RESULT = JSON.parse(responseData);
			console.log("[ OK ]送信：" + RESULT.createdNote.id);
		});
	});
	
	req.on('error', (error) => {
		console.error(error);
	});
	
	req.write(data);
	req.end();
}

function MAIN(){
	let TEMP_DATE = undefined;
	setInterval(() => {
		const DATE = new Date();
		const DATE_TEXT = DATE.getFullYear() + "年" + DATE.getMonth() + "月" + DATE.getDate() + "日" + DAY[DATE.getDay()] + "曜日 " + DATE.getHours() + "時";

		if(TEMP_DATE === undefined){//もし初期化済みなら
			//実行しないようにする
			TEMP_DATE = DATE_TEXT;
		}

		if(DATE_TEXT !== TEMP_DATE){
			console.log("[ *** ]" + DATE_TEXT + "です、送信します・・・");

			SEND(DATE_TEXT + "をお知らせします");

			TEMP_DATE = DATE_TEXT;
		}
	}, 100);

	console.log("起動");
}

MAIN()