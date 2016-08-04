// ==UserScript==
// @name         GitHub Label Manager
// @namespace    http://github.com/senritsu
// @version      0.1
// @description  Enables importing/exporting of repository labels
// @author       senritsu
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.min.js
// @match        http*://github.com/*/*/labels*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
/* jshint esnext: true */
/* jshint asi:true */

const find = (selector, context) => (context || document).querySelector(selector)
const findAll = (selector, context) => (context || document).querySelectorAll(selector)

const newLabelButton = find('.labels-list .subnav button.js-details-target')
const importButton = document.createElement('button')
importButton.id = 'import-labels'
importButton.classList.add('btn', 'btn-default', 'right', 'select-menu-button')
importButton.textContent = 'Import '

const exportButton = document.createElement('button')
importButton.id = 'export-labels'
exportButton.classList.add('btn', 'btn-default', 'right')
exportButton.textContent = 'Export'

const author = find('span.author a').textContent
const repository = find('.repohead-details-container strong[itemprop=name] a').textContent

const exportLink = document.createElement('a')
exportLink.style.display = 'none'
exportLink.download = `${author}-${repository}-labels.json`
exportButton.appendChild(exportLink)

const newLabelForm = find('form.new-label')

const importForm = document.createElement('form')
importForm.id = 'label-import-toolbar'
importForm.classList.add('form')
importForm.style.padding = '10px'
importForm.style.marginBottom = '15px'
importForm.style.backgroundColor = '#fafafa'
importForm.style.border = '1px solid #e5e5e5'
importForm.style.display = 'none'

const importInput = document.createElement('input')
importInput.id = 'label-import-file'
importInput.classList.add('form-control', 'right')
importInput.type = 'file'
importForm.appendChild(importInput)

const clearAllDiv = document.createElement('div')
clearAllDiv.classList.add('checkbox', 'right')
clearAllDiv.style.marginTop = '9px'
clearAllDiv.style.marginRight = '15px'
importForm.appendChild(clearAllDiv)

const clearAllLabel = document.createElement('label')
clearAllDiv.appendChild(clearAllLabel)

const clearAllCheckbox = document.createElement('input')
clearAllCheckbox.id = 'clear-labels-before-import'
clearAllCheckbox.type = 'checkbox'
clearAllLabel.appendChild(clearAllCheckbox)
clearAllLabel.appendChild(document.createTextNode(' Clear all existing labels first'))

const clearfix = document.createElement('div')
clearfix.classList.add('clearfix')
importForm.appendChild(clearfix)

console.log($)

if(newLabelButton) {
    setup()
}

function setup() {
    const parent = newLabelButton.parentNode
    parent.insertBefore(importButton, newLabelButton)
    parent.insertBefore(exportButton, newLabelButton)

    newLabelForm.parentNode.insertBefore(importForm, newLabelForm)

    let open = false
    importButton.addEventListener('click', (event) => {
        open = !open
        importForm.style.display = open ? 'block' : 'none'
    })

    importInput.addEventListener('change', (event) => {
        const reader = new FileReader()
        reader.onload = (event) => {
            const labels = JSON.parse(reader.result)

            if(clearAllCheckbox.checked) {
                deleteAllLabels()
            }

            for(const label of labels) {
                addLabel(label)
            }
        }
        reader.readAsText(importInput.files[0])
    })

    exportButton.addEventListener('click', exportLabels)
}

function rgb2hex(rgb) {
    const [_, r, g, b] = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)

    const hex = (x) => ("0" + parseInt(x).toString(16)).slice(-2)

    return "#" + hex(r) + hex(g) + hex(b)
}

function exportLabels() {
    const labels = Array.from(findAll('.labels-list-item .label-link'))
        .map((label) => ({
            name: find('.label-name', label).textContent,
            color: rgb2hex(label.style.backgroundColor)
        }))
    const data = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(labels, null, 2));
    exportLink.href = data
    exportLink.click()
}

function findLabel(label) {
    return Array.from(findAll('.labels-list-item'))
        .filter((x) => find('.label-name', x).textContent === label.name)[0]
}

function updateLabel(label, element) {
    find('.js-edit-label', element).click()
    find('.label-edit-name', element).value = label.name
    find('.color-editor-input', element).value = label.color
    find('.new-label-actions .btn-primary', element).click()
}

function addLabel(label) {
    find('input.label-edit-name', newLabelForm).value = label.name
    find('input#edit-label-color-new', newLabelForm).value = label.color
    find('button[type=submit]', newLabelForm).click()
}

function deleteLabel(element) {
    find('.labels-list-actions button.js-details-target', element).click()
    find('.label-delete button[type=submit]', element).click()
}

function deleteAllLabels() {
    const labels = Array.from(findAll('.labels-list-item'))
    for(const label of labels) {
        deleteLabel(label)
    }
}

/* jshint ignore:start */
]]></>).toString();
var c = babel.transform(inline_src);
eval(c.code);
/* jshint ignore:end */
