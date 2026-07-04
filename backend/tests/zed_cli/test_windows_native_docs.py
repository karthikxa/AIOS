from pathlib import Path


def test_windows_native_install_path_docs_match_installer() -> None:
    doc = Path("website/docs/user-guide/windows-native.md").read_text()
    install = Path("scripts/install.ps1").read_text()

    assert "%LOCALAPPDATA%\\zed\\zed-agent\\venv\\Scripts" in doc
    assert "Get-Command zed        # should print C:\\Users\\<you>\\AppData\\Local\\zed\\zed-agent\\venv\\Scripts\\zed.exe" in doc
    assert '$zedBin = "$InstallDir\\venv\\Scripts"' in install
