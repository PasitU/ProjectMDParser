/* 
# Heading level 1
## Heading level 2
### Heading level 3 
#### Heading level 4 
##### Heading level 5
###### Heading level 6 
__bold text__ 
**bold text** 
*italic text*
`word`
 * First item
 + Second item
 - Third item
[Guide](https://www.google.com)
TEST
> blockquote
---
~~TEST~~
*/

const rules = [
  // Lists
  [/^\s*(\*|\+|-)\s+(.+)$/gm, '<li>$2</li>'],

  // headers
  [/#{6}\s?([^\n]+)/g, '<h6>$1</h6>'],
  [/#{5}\s?([^\n]+)/g, '<h5>$1</h5>'],
  [/#{4}\s?([^\n]+)/g, '<h4>$1</h4>'],
  [/#{3}\s?([^\n]+)/g, '<h3>$1</h3>'],
  [/#{2}\s?([^\n]+)/g, '<h2>$1</h2>'],
  [/#{1}\s?([^\n]+)/g, '<h1>$1</h1>'],

  // bold, italics, and paragraph
  [/\*\*\s?([^\n]+)\*\*/g, '<b>$1</b>'],
  [/\*\s?([^\n]+)\*/g, '<i>$1</i>'],
  [/__([^_]+)__/g, '<b>$1</b>'],

  // links
  [/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#2A5DB0;text-decoration: none;">$1</a>'],

  // highlights
  [
    /(`)(\s?[^\n,]+\s?)(`)/g,
    '<span style="background-color:grey;color:black;text-decoration: none;border-radius: 3px;padding:0 2px;">$2</span>'
  ],

  // // Image
  // [/!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g, '<img src="$2" alt="$1" title="$3" />'],

  // Horizontal
  [/-{3,}/g, '<hr>'],

  // Quote
  [/^>\s?([^\n]+)/gm, '<blockquote>$1</blockquote>'],

  // Strikethrough
  [/~~([^~]+)~~/g, '<del>$1</del>'],
  [/^(?!<[huli>])([^\n]+)$/gm, '<p>$1</p>']
]

function wrapListItems(transformed) {
  return transformed.replace(/(<li>.+<\/li>)(\s*<li>.+<\/li>)*/g, '<ul>$&</ul>')
}

export function parseToMarkdown(text) {
  // Apply the rules to transform Markdown to HTML
  let transformed = rules.reduce(
    (acc, [regex, replacement]) => acc.replace(regex, replacement),
    text
  )

  transformed = wrapListItems(transformed)
  return transformed.replace(/\n<\/ul>/g, '</ul>')
}

export const initialText = `# Test
---
## Heading 2
### Heading 3
This is a test paragraph
- test 1
* test 2
+ test 3
You can [Click this link here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
__bold text__ 
**bold text** 
_italic text_
*italic text*
\`word\`
~~TEST~~
> Block Quote
`
