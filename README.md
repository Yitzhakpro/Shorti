<div align='center'>

# **🔗 Shorti 🔗**

</div>

<div align='center'>

### Open-Source, Self-Hosted, Application to make urls short

</div>

</br>

<h4 align='center'>
    <a href="https://github.com/Yitzhakpro/Shorti-Frontend/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Shorti is released under the MIT license." />
    </a>
    <a href="https://github.com/Yitzhakpro/Shorti-Frontend/issues">
        <img src="https://img.shields.io/github/commit-activity/m/Yitzhakpro/Shorti-Frontend" alt="git commit activity" />
    </a>
</h4>

# About the project

Shorti is a web application which used to shorten urls.
<br/>
Each user can create their own urls and they can view / edit / delete them and even watch how much they were being visited.
<br/>
All short urls are open to the public, anybody can use any redirect that exist, just like a regular url shortner.

# 📷 Screenshots

# 🔥 How does it work?

We want to pass redirect link request directly to our API to get redirection to the full url, <br>
so I added a NGINX that passes all requests that start with `/u/` prefix to react build files (and some assets redirection too) and all other to the api route that gets the redirection to the full url.<br>
You can find the template in: `nginx/templates/default.conf.template`

# 💻 Development

**⚠️To fire up the application you will need to run the [backend](https://github.com/Yitzhakpro/Shorti-Backend)**

clone the project:

```console
$ git clone https://github.com/Yitzhakpro/Shorti-Frontend.git
```

Install the deps:

```console
$ yarn
```

Run dev

```console
$ yarn dev
```

You can change the deafult API URL in `src/config/endpoints.ts`.<br>
You can also add env vars, just add a `.env` file and make sure to use vite syntax to add env vars.

# 🚀 Production

For production, you should use `docker`.
</br>
There are two scripts inside `package.json`:

- docker:build - builds the docker image
- docker:run - runs the docker image (notice we pass .env to run for passing API url to nginx)
