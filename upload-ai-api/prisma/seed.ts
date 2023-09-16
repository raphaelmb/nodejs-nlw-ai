import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.prompt.deleteMany()

  await prisma.prompt.create({
    data: {
        title: 'YouTube Title',
        template: `Your role is to generate three titles for a YouTube video.
        
        Below, you will receive a transcription of that video. Please use this transcription to create the titles.
        You will also receive a list of titles below; use this list as a reference for the titles to be generated.
        
        The titles should not exceed 60 characters.
        The titles should be catchy and attractive to maximize clicks.
        
        Return ONLY the three titles in a list format as shown below:
        '''
        - Title 1
        - Title 2
        - Title 3
        '''
        
        Transcription: (Insert transcription here)
        '''
        {transcription}
        '''`.trim()
    }
  })

  await prisma.prompt.create({
    data: {
        title: 'YouTube Description',
        template: `Your role is to generate a concise description for a YouTube video.

        Below, you will receive a transcription of that video. Please use this transcription to create the description.

        The description should contain a maximum of 80 words in the first person, covering the video's key points.

        Use attention-grabbing words that captivate the reader's attention.

        Additionally, at the end of the description, include a list of 3 to 10 hashtags in lowercase containing video-related keywords.

        The return should follow the following format:
        '''
        Description.

        #hashtag1 #hashtag2 #hashtag3 ...
        '''

        Transcription:
        '''
        {transcription}
        '''`.trim()
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })