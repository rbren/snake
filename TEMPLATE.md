# Template Customization Guide

To customize this template with your own app name, replace "OpenVibe Hello World" and "openvibe-hello-world" throughout the codebase.

## One-liner to replace everything:

```bash
find . -type f \( -name "*.json" -o -name "*.toml" -o -name "*.md" -o -name "*.yml" -o -name "*.yaml" -o -name "*.sh" -o -name "*.jsx" -o -name "*.js" -o -name "*.py" -o -name "*.html" \) -not -path "./node_modules/*" -not -path "./.git/*" -not -name "TEMPLATE.md" | xargs sed -i 's/openvibe-hello-world/YOUR-APP-NAME/g; s/OpenVibe Hello World/Your App Name/g'
```

Replace `YOUR-APP-NAME` with your kebab-case app name and `Your App Name` with your title-case app name.

After running the command, run `npm install` from the `./frontend` directory to regenerate package-lock.json
