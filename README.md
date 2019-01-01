this project was created as an exercise in dockerizing and hosting an application, and also to try out rich text editing with draftjs and markdown

... hah

this is really just an excuse to play more video games

see me at https://rollplays.me!

yes, i'm aware that secret keys and logins are visible, but it's not like you can do anything with them, except add amazing games like Mirror's Edge and Dishonored to my list 👌

### todid list
- [x] enable HTTPS
- [x] figure out how to set up a subdomain like api.rollplays.me

Oh, this was a trip and a half. I dropped `nginx-proxy` because I didn't know how to use it. Everything sits behind an nginx reverse proxy now. A lot of the `nginx.conf` was copy-pasted so I'm sure it can be improved.

And turns out you can't use the webroot method for wildcard domains, so you have to include each domain in the certbot command. Or do some DNS fiddly-whatsit.

- [x] port game info from Steam

Hey, manually inputting over 100 games is a baaad idea, especially when I keep tearing down my database. So there's a barebones migration script that retrieves my Steam library and seeds some basic info.

### todo list
- [ ] fancy blur filter
- [ ] animations are always good, right?
- [ ] explore postgres/knex/objection (currently using mongodb/mongoose)
- [ ] maybe actually play some video games, because that backlog is not going away on its own
