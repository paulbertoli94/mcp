FROM ghcr.io/sparfenyuk/mcp-proxy:latest

# Install the 'uv' package
RUN python3 -m ensurepip && pip install --no-cache-dir uv

ENV PATH="/usr/local/bin:$PATH" \
    UV_PYTHON_PREFERENCE=only-system

RUN apk add --no-cache git nodejs npm && npm install -g npx
RUN npm install -g @modelcontextprotocol/server-memory

# Clone Brave Search MCP repo
WORKDIR /opt
RUN git clone https://github.com/mikechao/brave-search-mcp.git

# Build Brave Search MCP
WORKDIR /opt/brave-search-mcp
RUN npm install && npm run build && npm install --omit=dev

# Set working dir and default entrypoint (mcp-proxy)
WORKDIR /

ENTRYPOINT [ "mcp-proxy" ]