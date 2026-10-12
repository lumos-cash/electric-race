"""Offline, loopback-only preview server. Uses Python 3 standard library."""
import functools
import http.server
import os
import socketserver
import webbrowser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))

class LocalServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True

if __name__ == '__main__':
    # Port 0 asks the OS for an available port; never hijack another server.
    with LocalServer(('127.0.0.1', 0), handler) as server:
        url = 'http://127.0.0.1:%d/' % server.server_address[1]
        print('Electric Race offline preview:', url, flush=True)
        print('Keep this window open. Press Ctrl+C to stop.', flush=True)
        webbrowser.open(url)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
