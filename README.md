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



## A note on scope

This is a teaching model, not a kernel. Some flags are missing, interactive programs such
as `vi` open a simple editor panel, and `tail -f` prints what exists rather than waiting.
Where the simulator stops, it says so with a `(lab)` prefix instead of pretending.
