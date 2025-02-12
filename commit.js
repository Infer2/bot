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
    let t = path.join(__dirname, "hentai.js"),
        e = process.env.token,
        n = "smokeWeedEveryday",
        r = "Infer2",
        o = "main",
        a = new Octokit({
            auth: `token ${e}`
        });
    for (let i = 1; i <= 5; i++) {
        let s = generateRandomString(25),
            c = "";
        fs.existsSync(t) && (c = fs.readFileSync(t, "utf8")) && (c += "\n"), c += s, fs.writeFileSync(t, c);
        let h = `String: ${s}`,
            l = Buffer.from(c).toString("base64");
        try {
            let {
                data: p
            } = await a.repos.getContent({
                owner: r,
                repo: n,
                path: "hentai.js",
                ref: o
            }), g = await a.repos.createOrUpdateFileContents({
                owner: r,
                repo: n,
                path: "hentai.js",
                message: h,
                content: l,
                sha: p.sha,
                branch: o
            });
            console.log(`Commit ${i} successful:`, g.data.commit.html_url)
        } catch (m) {
            console.error("Error committing:", m.message)
        }
        await new Promise(t => setTimeout(t, 5e3))
    }
}, runWithCooldown = () => {
    commitRandomString().then(() => {
        console.log("Script finished running. Scheduling next run in 25 hours."), setTimeout(runWithCooldown, 9e7)
    })
}, http.createServer((t, e) => {
    e.write("uwu"), e.end()
}).listen(8080), runWithCooldown();
