# codenamize-action ![David](https://img.shields.io/david/reallyreallyreal/codenamize-action)

> An action that wraps codenamize-js to "generate consistent easier-to-remember codenames from strings, numbers, or other seed inputs".





## Inputs
It takes at least a seed as an input. See [codenamize-js complete list of options](https://github.com/stemail23/codenamize-js).

Options are mapped as follow:
| codenamize-js  | codenamize-action |
| -------------- | ----------------- |
| seed           | seed              |
| adjectiveCount | adjective-count   |
| particles      | particles         |
| maxItemChars   | max-item-chars    |
| capitalize     | capitalize        |
| separator      | separator         |

Note: all option values are string.

## Example Usage

```yml
- name: Generate codename
  uses: reallyreallyreal/codenamize-action@master
  with:
    seed: 1
    particles: |
      noun
      adjective
      noun
    capitalize: true
```

## license

[MIT](/LICENSE) &copy; 2021 ReallyReallyReal
