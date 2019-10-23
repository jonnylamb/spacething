FROM kinlan/puppets:latest

COPY package.json yarn.lock /
RUN yarn install

# Add user so we don't need --no-sandbox.
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser ./node_modules

# Run everything after as non-privileged user.
USER pptruser

COPY index.js /

EXPOSE 8084
ENTRYPOINT ["dumb-init", "--"]
CMD ["yarn", "-s", "run", "start"]