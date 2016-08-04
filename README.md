# github-label-manager
A userscript to help manage labels for repositories.

Supports exporting and importing all labels to and from JSON.

Additional buttons are added to the label management page on GitHub to control the userscript. The import file picker is hidden by default and toggled by the import button.

![buttons](https://cloud.githubusercontent.com/assets/790689/17415827/aadce650-5a8b-11e6-922e-8e02ca05fb9c.png)

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
