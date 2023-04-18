import { useEffect, useState } from 'react'
import Item from './Item'
import styles from './Itens.module.scss'
import cardapio from './itens.json'

interface Props {
	filtro: number | null
	ordenador: string
	busca: string
}

export default function Itens({ filtro, ordenador, busca }: Props) {
	const [lista, setLista] = useState(cardapio)

	useEffect(() => {
		const novaLista = cardapio.filter(
			(item) => testaBusca(item.title) && testaFiltro(item.category.id),
		)
		setLista(ordenar(novaLista))
	}, [busca, filtro, ordenador])

	function testaBusca(title: string) {
		const regex = new RegExp(busca, 'i')
		return regex.test(title)
	}

	function testaFiltro(id: number) {
		if (filtro !== null) return filtro === id

		return true
	}

	function ordenar(lista: typeof cardapio) {
		switch (ordenador) {
			case 'porcao':
				return lista.sort((a, b) => (a.size > b.size ? 1 : -1))
			case 'qtd_pessoas':
				return lista.sort((a, b) => (a.serving > b.serving ? 1 : -1))
			case 'preco':
				return lista.sort((a, b) => (a.price > b.price ? 1 : -1))
			default:
				return lista
		}
	}

	return (
		<div className={styles.itens}>
			{lista.map((item) => (
				<Item key={item.id} {...item} />
			))}
		</div>
	)
}
