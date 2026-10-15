# Linux Lab

An interactive Linux trainer that runs entirely in the browser. No server, no backend, no
container — the terminal is a Linux simulator written in plain JavaScript, and the whole
app is one self-contained HTML file.

- **55 story missions** — a taught campaign, from `pwd` to a 4 a.m. incident with two
  unrelated causes.
- **269 drill generators** — every drill is generated from a seed: different files, users,
  sizes, ports and answers each time, with the solution worked out as the box is built, so
  every variant is machine-checkable. 18 of them are multi-step scenarios where something
  is broken and nothing tells you which layer.
- **9 timed exam papers** — including RHCSA-, Linux+- and LFCS-shaped practicals. A clock,
  no hints, no solutions, scored at the end with a breakdown of what was missed.
- **138 quiz questions** tagged against Linux Essentials, LPIC-1, CompTIA Linux+ (XK0-006),
  RHCSA and LFCS objectives.
- **235 simulated commands** — a real shell parser (quoting, globbing, pipelines,
  redirection, heredocs, loops, functions, arithmetic), an inode filesystem with
  permissions, ACLs and attributes, users and groups, sudoers, processes and signals,
  systemd units and journald, cron, networking, firewalls, SELinux, LVM, package managers,
  and real MD5/SHA digests.

Nothing you type leaves the page. Nothing can break a real machine.

## Publishing it as a website (GitHub Pages)

`index.html` at the repo root is the whole site. Nothing needs to be built on the server.

1. Create an empty repository on GitHub, then from this folder:

   ```sh
   git init
   git add .
   git commit -m "Linux Lab"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. On GitHub: **Settings → Pages**. Under *Build and deployment*, set **Source** to
   *Deploy from a branch*, pick branch `main` and folder `/ (root)`, then **Save**.

3. Wait a minute, then open `https://<your-username>.github.io/<your-repo>/`.

The `.nojekyll` file is already there, which tells Pages to serve the files as they are
instead of running them through Jekyll.

To use it offline instead, just open `index.html` in any browser — it works from
`file://` with no web server.

## Working on it

Requires Node (any recent version). No dependencies to install for building.

```sh
node build.js        # bundles src/ into dist/linux-lab.html and index.html
node test/missions.js # runs all 55 missions through their own solutions
node test/drills.js 20 # generates 20 variants of every drill and solves each one
node test/one.js <id>  # run a single mission or drill and print the transcript
```

`test/drills.js` is the quality gate worth knowing about: for each of the 269 templates it
generates N seeded variants, asserts the drill is not already solved at the start, runs the
solution the generator produced alongside the scenario, catches simulator crashes, asserts
every objective ends up met, and reports how many distinct variants a template produced.
A template that cannot solve itself fails the build.

`test/ui.js` drives the built page in headless Chromium at phone size (390×844) and walks
the drill and exam modes end to end. It needs Playwright:

```sh
npm i -D playwright && npx playwright install chromium
node test/ui.js
```

## Layout

```
src/core/        util, VFS with real inodes, machine, shell parser, interpreter
src/commands/    the ~235 simulated commands, grouped by area
src/data/        certification objective maps
src/missions/    mission runtime (Lab, Ctx, objective checking) + the 55 story missions
src/drills/      drill runtime (seeded generators, exam papers) + 269 templates
src/quiz/        the question bank
src/ui/          index.html shell and app.js (all the interface logic)
build.js         concatenates the above into one HTML file
test/            mission, drill and UI verification
```

Progress is kept in `localStorage` on the device, and the menu has a code you can copy to
move it to another browser or phone.

## A note on scope

This is a teaching model, not a kernel. Some flags are missing, interactive programs such
as `vi` open a simple editor panel, and `tail -f` prints what exists rather than waiting.
Where the simulator stops, it says so with a `(lab)` prefix instead of pretending.
