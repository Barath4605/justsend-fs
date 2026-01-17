gotchu. plain, human, zero “ai-generated vibes”, no cringe buzzwords.

---

# justsend.com

JustSend is a minimal text-sharing app built for speed, privacy, and zero friction.
No accounts. No logins. No tracking. Just paste text, get a code, and share.

The goal is simple:
**move text from one screen to another as fast as possible**.

## what it does

* send any formatted text instantly
* get a short, unique code
* open `justsend.com/{code}` to receive it
* messages auto-expire after a fixed time
* nothing is stored forever, nothing is tied to you

## why it exists

Most platforms overcomplicate something trivial.
JustSend strips it down to the bare minimum:

* no sign-up walls
* no permanent links
* no “share with email / username / profile” nonsense
* no unnecessary UI noise

If you just want to move text — this does exactly that.

## features

* rich text editor (headings, lists, formatting)
* short code–based sharing
* automatic expiry
* clean, dark-first UI
* mobile and desktop friendly
* backend-validated requests
* rate-limit ready

## tech stack

**frontend**

* React + Vite
* Tailwind CSS
* TipTap editor
* Lucide icons

**backend**

* Spring Boot
* REST API
* MySQL
* JPA / Hibernate

## how it works (high level)

1. user writes text
2. frontend sends content to `/send`
3. backend stores it with expiry + generates code
4. user receives the code
5. receiver visits `/{code}`
6. backend validates expiry and returns content

Expired or invalid codes return nothing.

## philosophy

* temporary by default
* simple over clever
* UX over features
* privacy as a baseline, not a toggle

## status

Actively building.
Frontend and backend are evolving together.

