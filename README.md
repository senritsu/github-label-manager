# github-label-manager
A userscript to help manage labels for repositories.

Supports exporting and importing all labels to and from JSON.

Additional buttons are added to the label management page on GitHub to control the userscript.

## Requirements

Tested only with Tampermonkey, but might work with Greasemonkey as well. Requires ES6 support.

## Import/Export format

The JSON format should contain an array of labels. Each label should conform to this structure:

```json
{
  "name": "bug",
  "color": "#ee0701"
}
```

An example JSON export of the default labels in a new repository can be found inside the repository.
