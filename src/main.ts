import * as path from 'path';
import * as download from 'download';
import { create } from './twitterFactory';

const downloadFolder = path.resolve(__dirname, '../download_folder');

(async () => {
    const client = create();

    try {
        let tweets;
        let latestId;
        do {
            const params = {
                count: 200,
                // replace twitter account here
                screen_name: ''
            };

            if (latestId) {
                params['max_id'] = latestId;
            }

            console.info(`fetch favorites list`);
            console.dir(params);
            tweets = await client.get('favorites/list', params);

            for await (const tweet of tweets) {
                latestId = tweet.id;
                const { media: mediaEntities } = tweet?.extended_entities ?? { media: [] };
                if (!mediaEntities || mediaEntities.length === 0) {
                    continue;
                }

                const [media] = mediaEntities;

                if (media.type !== 'video') {
                    continue;
                }
                const { video_info } = media;
                const { variants } = video_info;
                if (variants.length > 0) {
                    const video = variants[variants.length - 1];
                    console.info(`downloading video, contentType: ${video.content_type}, url: ${video.url}`);
                    await download(video.url, downloadFolder);
                }
            }

        } while (tweets.length > 0)
        console.info(`download finished`);

    } catch (e) {
        console.error(e);
    }

})();
