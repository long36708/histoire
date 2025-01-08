import type { ClientCommandOptions } from 'histoire'
import { kebabCase } from 'change-case'
import { openStory, sendEvent } from 'histoire/plugin'

export default {
  prompts: [
    {
      field: 'component',
      label: 'Choose a component',
      type: 'select',
      options: async search => sendEvent('listSvelteComponents', { search }),
      required: true,
    },
    {
      field: 'fileName',
      label: 'File name',
      type: 'text',
      required: true,
      defaultValue: answers => answers.component?.replace(/[^/]+\/([^/]+)\.svelte$/, '$1.story.svelte'),
    },
  ],
  clientAction: (params) => {
    const index = params.component.lastIndexOf('/')
    const dirname = params.component.substring(0, index + 1)
    const file = `${dirname}${params.fileName}`
    const storyId = kebabCase(file.toLowerCase())
    openStory(storyId)
  },
} as ClientCommandOptions
