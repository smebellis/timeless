#!/usr/bin/env python3
"""
create_mern_structure.py

A Python script to create a sample MERN stack folder structure.
It will create folders for both 'frontend' and 'backend', along with
placeholder files.

Usage:
    python create_mern_structure.py
"""

import os

# Define the desired structure as a nested dictionary.
# Keys represent file or directory names.
# If the value is a dict, it's treated as a subdirectory.
# If the value is None or a string, it's treated as a file (empty or with content).
structure = {
    "frontend": {
        "public": {},  # Empty directory
        "src": {
            "components": {
                "Navbar.js": None,
                "Footer.js": None,
                "ImageCard.js": None
            },
            "pages": {
                "Home.js": None,
                "Portfolio.js": None,
                "About.js": None,
                "Contact.js": None
            },
            "App.js": None,
            "index.js": None
        },
        "package.json": None
    },
    "backend": {
        "controllers": {
            "contactController.js": None,
            "imageController.js": None
        },
        "models": {
            "Image.js": None,
            "Contact.js": None
        },
        "routes": {
            "contactRoutes.js": None,
            "imageRoutes.js": None
        },
        ".env": None,
        "server.js": None,
        "package.json": None
    }
}

def create_structure(base_path, struct):
    """
    Recursively creates directories and files based on a nested dictionary structure.
    :param base_path: The root path where creation should begin.
    :param struct: A (potentially nested) dict describing the folder/file structure.
    """
    for name, content in struct.items():
        path = os.path.join(base_path, name)

        if isinstance(content, dict):
            # content is a dict -> create directory and recurse
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)
        else:
            # content is None or a string -> create a file
            # If you want to add initial file content, set content = "some text..."
            os.makedirs(os.path.dirname(path), exist_ok=True)
            with open(path, 'w', encoding='utf-8') as f:
                # Write content if provided; otherwise, leave empty
                if isinstance(content, str):
                    f.write(content)
                else:
                    f.write('')  # Empty file

def main():
    base_dir = os.getcwd()  # current directory
    create_structure(base_dir, structure)
    print("MERN folder structure has been created.")

if __name__ == "__main__":
    main()
