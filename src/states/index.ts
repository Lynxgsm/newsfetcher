import { Article } from '@/types/article'
import { proxy } from 'valtio'

type StateProps = {
    articles: Article[]
    setArticles: (articles: Article[]) => void
    loading: boolean;
    toggleLoading: () => void;
}

export const states: StateProps = proxy({
    articles: [],
    setArticles: (articles) => states.articles = articles,
    loading: false,
    toggleLoading: () => states.loading = !states.loading
})