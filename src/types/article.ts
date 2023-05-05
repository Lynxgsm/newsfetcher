export type ArticleInfo = {
    title: string;
    tag: string;
    link: string;
    cover_image: string;
    date: string;
    author: string;
}

export type ArticleContent = {
    content: string;
}

export type Article = ArticleInfo & ArticleContent