module.exports = {
    apps: [
        {
            name: "ShowIt backend",
            script: "./dist/src/server.js",
            env_production: {
                NODE_ENV: "production",
            },
        },
    ],
};