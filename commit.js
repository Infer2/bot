const fs = require("fs"),
    path = require("path"),
    {
        Octokit: t
    } = require("@octokit/rest"),
    crypto = require("crypto"),
    http = require("http"),
    COMMIT_COUNT = 5,
    RANDOM_STRING_LENGTH = 25,
    COOLDOWN_TIME_MS = 846e5,
    generateRandomString = t => crypto.randomBytes(2 * t).toString("hex").slice(0, t),
    commitRandomString = async e => {
        path.join(__dirname, "hentai.js");
        let n = process.env.token,
            o = "smokeWeedEveryday",
            r = "Infer2",
            i = "main",
            a = new t({
                auth: `token ${n}`
            }),
            m = null,
            s = "";
        try {
            let {
                data: h
            } = await a.repos.getContent({
                owner: r,
                repo: o,
                path: "hentai.js",
                ref: i
            });
            m = h.sha, s = Buffer.from(h.content, "base64").toString("utf8")
        } catch (c) {
            console.log("File not found, starting fresh.")
        }
        let l = generateRandomString(25),
            g = `${s}
${l}`,
            p = Buffer.from(g).toString("base64");
        try {
            let {
                data: d
            } = await a.repos.createOrUpdateFileContents({
                owner: r,
                repo: o,
                path: "hentai.js",
                message: `Commit ${e}: String - ${l}`,
                content: p,
                sha: m,
                branch: i
            });
            console.log(`Commit ${e} successful:`, d.commit.html_url)
        } catch (u) {
            console.error(`Error in commit ${e}:`, u.message)
        }
    }, runWithCooldown = async () => {
        for (let t = 1; t <= 5; t++) await commitRandomString(t), console.log(`Commit ${t} completed. Waiting before the next commit.`), await new Promise(t => setTimeout(t, 5e3));
        console.log("All commits completed. Scheduling next run in 25 hours."), setTimeout(runWithCooldown, 846e5)
    }, httpServer = http.createServer((t, e) => {
        e.write("uwu"), e.end()
    });
httpServer.listening || httpServer.listen(8080, runWithCooldown);
