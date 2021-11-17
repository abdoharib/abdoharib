const puppeteer = require('puppeteer');
let result = null;
let browser = null;


const minimal_args = [
	'--autoplay-policy=user-gesture-required',
	'--disable-background-networking',
	'--disable-background-timer-throttling',
	'--disable-backgrounding-occluded-windows',
	'--disable-breakpad',
	'--disable-client-side-phishing-detection',
	'--disable-component-update',
	'--disable-default-apps',
	'--disable-dev-shm-usage',
	'--disable-domain-reliability',
	'--disable-extensions',
	'--disable-features=AudioServiceOutOfProcess',
	'--disable-hang-monitor',
	'--disable-ipc-flooding-protection',
	'--disable-notifications',
	'--disable-offer-store-unmasked-wallet-cards',
	'--disable-popup-blocking',
	'--disable-print-preview',
	'--disable-prompt-on-repost',
	'--disable-renderer-backgrounding',
	'--disable-setuid-sandbox',
	'--disable-speech-api',
	'--disable-sync',
	'--hide-scrollbars',
	'--ignore-gpu-blacklist',
	'--metrics-recording-only',
	'--mute-audio',
	'--no-default-browser-check',
	'--no-first-run',
	'--no-pings',
	'--no-sandbox',
	'--no-zygote',
	'--password-store=basic',
	'--use-gl=swiftshader',
	'--use-mock-keychain'
];

async function main() {

}




exports.handler = async (event, context) => {
	try {
		browser = await puppeteer.launch({
			headless: true,
			args: minimal_args
		});

		let page = await browser.newPage();

		await page.setRequestInterception(true);
		page.on('request', (req) => {
			if (req.resourceType() === 'image' ||req.resourceType() === 'css' ) {
				req.abort();
			} else {
				req.continue();
			}
		});
		await page.goto(
			'https://test1332.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=2ufuuh1rb1m5ji4bkie6l1u36u&redirect_uri=https://www.google.com/&scope=email+aws.cognito.signin.user.admin&identity_provider=COGNITO',
			{
				waitUntil: 'networkidle2'
			}
		);

		result = await page.title();

		await page.screenshot({ path: './screen.png' });

		await page.type('#signInFormUsername', 'abdoharib');
		await page.type('#signInFormPassword', 'Ah68121140');

		await page.screenshot({ path: './screen2.png' });

		await page.click("input[name='signInSubmitButton']");

		await page.waitForNavigation();

		let url = await page.url();

		if (browser !== null) {
			await browser.close();
		}
		console.log(url);
		return url

	} catch (error) {
		console.log(error);
	}

};
