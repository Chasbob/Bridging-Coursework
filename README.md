# Bridging Coursework

Here you can find the source of my Django based Blog and CV!

The API, along with a copy of the react bundle are available at [chasbob.pythonanywhere.com](https://chasbob.pythonanywhere.com/).

Since pythonanywhere doesn't exactly have the most modern approch to deployment, website is also available at [bridging-coursework.defreitas.io](https://bridging-coursework.defreitas.io/) which is hosted on [netlify.com](https://netlify.com)

## Development

The [Makefile](./Makefile) includes several useful targets...

I've used [mkcert](https://github.com/FiloSottile/mkcert) for development `https`.

First run `make run` to start Django.
Then open another terminal and run `make frontend` to start the react development server.
