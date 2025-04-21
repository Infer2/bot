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
    commitRandomString = async () => {
        path.join(__dirname, "hentai.js");
        let e = process.env.token,
            n = "smokeWeedEveryday",
            r = "Infer2",
            o = "main",
            i = new t({
                auth: `token ${e}`
            }),
            a = null,
            s = "";
        try {
            let {
                data: h
            } = await i.repos.getContent({
                owner: r,
                repo: n,
                path: "hentai.js",
                ref: o
            });
            a = h.sha, s = Buffer.from(h.content, "base64").toString("utf8")
        } catch (c) {
            console.log("File not found, starting fresh.")
        }
        let l = [];
        for (let m = 1; m <= 5; m++) l.push(generateRandomString(25));
        let g = `${s}
${l.join("\n")}`,
            p = Buffer.from(g).toString("base64");
        try {
            let {
                data: d
            } = await i.repos.createOrUpdateFileContents({
                owner: r,
                repo: n,
                path: "hentai.js",
                message: "Adding 5 random strings",
                content: p,
                sha: a,
                branch: o
            });
            console.log("Commit successful:", d.commit.html_url)
        } catch (u) {
            console.error("Error committing:", u.message)
        }
    }, runWithCooldown = () => {
        commitRandomString().then(() => {
            console.log("Script finished running. Scheduling next run in 25 hours."), setTimeout(runWithCooldown, 846e5)
        })
    }, httpServer = http.createServer((t, e) => {
        e.write("uwu"), e.end()
    });
httpServer.listening || httpServer.listen(8080, runWithCooldown);
