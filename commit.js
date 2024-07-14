const fs = require("fs"),
	path = require("path"),
	{
		Octokit: Octokit
	} = require("@octokit/rest"),
	crypto = require("crypto"),
	http = require("http"),
	COMMIT_COUNT = 5,
	RANDOM_STRING_LENGTH = 25,
	COOLDOWN_TIME_MS = 846e5;
generateRandomString = t => {
	let e = crypto.randomBytes(t).toString("hex");
	for (; e.length < t;) e += crypto.randomBytes(t - e.length).toString("hex");
	return e.length > t && (e = e.slice(0, t)), e
}, commitRandomString = async () => {
	const t = path.join(__dirname, "hentai.js"),
		e = process.env.token,
		n = "smokeWeedEveryday",
		o = "Infer2",
		r = "main",
		i = new Octokit({
			auth: `token ${e}`
		});
	for (let e = 0; e < 5; e++) {
		const s = generateRandomString(25);
		let a = "";
		fs.existsSync(t) && (a = fs.readFileSync(t, "utf8"), a && (a += "\n")), a += s, fs.writeFileSync(t, a);
		const c = `Commit random string: ${s}`,
			h = Buffer.from(a).toString("base64");
		try {
			const {
				data: t
			} = await i.repos.getContent({
				owner: o,
				repo: n,
				path: "hentai.js",
				ref: r
			}), s = await i.repos.createOrUpdateFileContents({
				owner: o,
				repo: n,
				path: "hentai.js",
				message: c,
				content: h,
				sha: t.sha,
				branch: r
			});
			console.log(`Commit ${e+1} successful:`, s.data.commit.html_url)
		} catch (t) {
			console.error("Error committing:", t.message)
		}
		await new Promise((t => setTimeout(t, 5e3)))
	}
}, runWithCooldown = () => {
	commitRandomString().then((() => {
		console.log("Script finished running. Scheduling next run in 25 hours."), setTimeout(runWithCooldown, 9e7)
	}))
}, http.createServer(((t, e) => {
	e.write("uwu"), e.end()
})).listen(8080), runWithCooldown();
