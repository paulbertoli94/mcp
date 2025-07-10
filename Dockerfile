FROM ghcr.io/sparfenyuk/mcp-proxy:latest

# Install the 'uv' package
RUN python3 -m ensurepip && pip install --no-cache-dir uv

ENV PATH="/usr/local/bin:$PATH" \
    UV_PYTHON_PREFERENCE=only-system

RUN apk add --no-cache nodejs npm && npm install -g npx
RUN npm install -g @modelcontextprotocol/server-memory

ENTRYPOINT [ "mcp-proxy" ]