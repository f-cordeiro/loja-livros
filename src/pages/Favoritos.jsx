import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    IconButton,
    Typography,
} from "@mui/material";

import {
    FaHeart,
    FaTrash,
    FaExternalLinkAlt,
    FaBook,
} from "react-icons/fa";

import "../css/favoritos.css";

function Favoritos() {
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        carregarFavoritos();
    }, []);

    function carregarFavoritos() {
        const dados =
            JSON.parse(
                localStorage.getItem(
                    "bookflix_favoritos"
                )
            ) || [];

        setFavoritos(dados);
    }

    function removerFavorito(key) {
        const novosFavoritos =
            favoritos.filter(
                (livro) => livro.key !== key
            );

        localStorage.setItem(
            "bookflix_favoritos",
            JSON.stringify(novosFavoritos)
        );

        setFavoritos(novosFavoritos);
    }

    function imagemLivro(livro) {
        if (livro.cover_i) {
            return `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`;
        }

        return "https://via.placeholder.com/300x450?text=Sem+Capa";
    }

    function autores(livro) {
        if (
            !livro.author_name ||
            livro.author_name.length === 0
        ) {
            return "Autor desconhecido";
        }

        return livro.author_name
            .slice(0, 3)
            .join(", ");
    }

    function abrirLivro(livro) {
        if (!livro.key) {
            return;
        }

        window.open(
            `https://openlibrary.org${livro.key}`,
            "_blank",
            "noopener,noreferrer"
        );
    }

    return (
        <main className="favoritos-page">
            <Container
                maxWidth="xl"
                className="favoritos-container"
            >
                {/* HERO */}

                <section className="favoritos-hero">
                    <div className="favoritos-icon">
                        <FaHeart />
                    </div>

                    <Typography
                        component="h1"
                        className="favoritos-title"
                    >
                        Meus{" "}
                        <span>favoritos</span>
                    </Typography>

                    <Typography className="favoritos-subtitle">
                        Aqui estão os livros que você
                        escolheu guardar.
                    </Typography>
                </section>

                {/* CONTADOR */}

                {favoritos.length > 0 && (
                    <div className="favoritos-info">
                        <Typography>
                            <strong>
                                {favoritos.length}
                            </strong>{" "}
                            {favoritos.length === 1
                                ? "livro salvo"
                                : "livros salvos"}
                        </Typography>
                    </div>
                )}

                {/* LISTA */}

                {favoritos.length > 0 ? (
                    <section className="favoritos-grid">
                        {favoritos.map(
                            (livro, index) => (
                                <Card
                                    key={
                                        livro.key ||
                                        index
                                    }
                                    className="favorito-card"
                                >
                                    <div className="favorito-cover">
                                        <CardMedia
                                            component="img"
                                            image={imagemLivro(
                                                livro
                                            )}
                                            alt={
                                                livro.title ||
                                                "Livro"
                                            }
                                            className="favorito-cover-image"
                                        />

                                        <IconButton
                                            onClick={() =>
                                                removerFavorito(
                                                    livro.key
                                                )
                                            }
                                            className="favorito-delete"
                                            title="Remover dos favoritos"
                                        >
                                            <FaTrash />
                                        </IconButton>
                                    </div>

                                    <CardContent className="favorito-content">
                                        <Typography
                                            component="h2"
                                            className="favorito-title"
                                        >
                                            {livro.title ||
                                                "Título não disponível"}
                                        </Typography>

                                        <Typography className="favorito-author">
                                            {autores(
                                                livro
                                            )}
                                        </Typography>

                                        {livro.first_publish_year && (
                                            <Typography className="favorito-year">
                                                Publicado em{" "}
                                                {
                                                    livro.first_publish_year
                                                }
                                            </Typography>
                                        )}

                                        <Button
                                            fullWidth
                                            variant="contained"
                                            endIcon={
                                                <FaExternalLinkAlt />
                                            }
                                            onClick={() =>
                                                abrirLivro(
                                                    livro
                                                )
                                            }
                                            className="favorito-button"
                                        >
                                            Ver livro
                                        </Button>
                                    </CardContent>
                                </Card>
                            )
                        )}
                    </section>
                ) : (
                    /* VAZIO */

                    <section className="favoritos-empty">
                        <div className="favoritos-empty-icon">
                            <FaBook />
                        </div>

                        <Typography component="h2">
                            Sua lista está vazia
                        </Typography>

                        <Typography>
                            Você ainda não adicionou
                            nenhum livro aos favoritos.
                        </Typography>

                        <Button
                            variant="contained"
                            href="/"
                            className="favoritos-empty-button"
                        >
                            Explorar livros
                        </Button>
                    </section>
                )}
            </Container>
        </main>
    );
}

export default Favoritos;