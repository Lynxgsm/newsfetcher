import { Article, ArticleContent, ArticleInfo } from '@/types/article';
import { load, Element } from 'cheerio'
import { compareTwoDates, convertDateFromInput } from './date';

const maxPages: number = 10;
const initialPage: number = 1;
const BASE_URL: string = "https://newsmada.com/category/les-nouvelles/";

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
};

const results: Article[] = [];

async function getArticleContent(url: string): Promise<ArticleContent> {
    const page = await fetch(url, { headers });
    const html = await page.text()
    const content = load(html);
    return {
        content: content('.post-inner').find('.entry-content').find('p').text().trim(),
    };
}

function gatherAllRelevantArticles(searchTags: string[], text: any): ArticleInfo[] {
    const soup = load(text);
    const articles = soup('article');

    const articlesFetched: ArticleInfo[] = [];

    articles.each((_, element: Element) => {
        const article = soup(element);
        const title = article.find('.entry-title');
        const tags = article.find('.entry-meta span.cat-links a');
        const link: string = title.find('a').attr('href') || '';
        const image: string = article.find('img').attr('src') || '';
        const author = article.find("section.entry-body span.entry-author a").text() ?? "";
        const date = article.find("section.entry-body span.entry-date time").text() ?? ""

        tags.each((_, element: Element) => {
            const tag = load(element);
            const tagText: string = tag.text().toLowerCase().trim();

            const articleData: ArticleInfo = {
                author,
                date,
                title: title.text(),
                tag: tagText,
                link,
                cover_image: image,
            };

            articlesFetched.push(articleData)

        });
    });

    console.log(`Got ${articlesFetched.length} articles`);

    return articlesFetched;
}

export function testDate(searchTags: string[], date: string) {
    return { searchTags, date: 0 }
}

export async function startGatheringFromNouvelles(searchTags: string[], date: string) {
    let stop = false;
    for (let i = initialPage; i <= maxPages; i++) {
        console.log(`Gathering page ${i}`);
        const url: string = `${BASE_URL}/page/${i}`;
        const req = await fetch(url, { headers });
        const body = await req.text();
        const frontArticles: ArticleInfo[] = gatherAllRelevantArticles(searchTags, body);

        for (let j = 0; j < frontArticles.length; j++) {
            const hasTag = searchTags.find((searchTag) => searchTag === frontArticles[j].tag)

            if (compareTwoDates(date, frontArticles[j].date) !== 0) {
                console.log("Must break");
                stop = true
                break;
            }

            if (hasTag) {
                const articleContent: ArticleContent = await getArticleContent(frontArticles[j].link);
                const newArticle: Article = { ...frontArticles[j], ...articleContent };
                results.push({ ...newArticle, ...frontArticles[j] });
            }
        }

        if (stop) {
            break
        }
    }

    return results
}

