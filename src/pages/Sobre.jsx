import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Typography,
} from "@mui/material";

import {
    FaBook,
    FaSearch,
    FaHeart,
    FaLayerGroup,
    FaExternalLinkAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../css/sobre.css";

function Sobre() {
    const navigate = useNavigate();

    return (
        <main className="sobre-page">
            <Container
                maxWidth="lg"
                className="sobre-container"
            >
                {/* HERO */}

                <section className="sobre-hero">
                    <div className="sobre-logo">
                        <FaBook />
                    </div>

                    <Typography
                        component="h1"
                        className="sobre-title"
                    >
                        Sobre o{" "}
                        <span>BOOKFLIX</span>
                    </Typography>

                    <Typography className="sobre-subtitle">
                        Um catálogo digital para descobrir
                        livros, autores e novas histórias.
                    </Typography>
                </section>

                {/* SOBRE O PROJETO */}

                <section className="sobre-intro">
                    <Typography
                        component="h2"
                        className="sobre-section-title"
                    >
                        O que é o BOOKFLIX?
                    </Typography>

                    <Typography className="sobre-text">
                        O BOOKFLIX é uma aplicação web
                        desenvolvida para facilitar a busca
                        e descoberta de livros. A plataforma
                        permite pesquisar obras, explorar
                        categorias e salvar livros favoritos.
                    </Typography>

                    <Typography className="sobre-text">
                        Os resultados apresentados são
                        obtidos através da Open Library,
                        permitindo consultar informações
                        sobre diferentes livros e autores.
                    </Typography>
                </section>

                {/* FUNCIONALIDADES */}

                <section className="sobre-features">
                    <Typography
                        component="h2"
                        className="sobre-section-title"
                    >
                        O que você pode fazer?
                    </Typography>

                    <div className="sobre-feature-grid">
                        <Card className="sobre-feature-card">
                            <CardContent>
                                <div className="sobre-feature-icon">
                                    <FaSearch />
                                </div>

                                <Typography
                                    component="h3"
                                    className="sobre-feature-title"
                                >
                                    Pesquisar livros
                                </Typography>

                                <Typography className="sobre-feature-text">
                                    Pesquise por título,
                                    autor, assunto ou
                                    tema e encontre
                                    diferentes obras.
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card className="sobre-feature-card">
                            <CardContent>
                                <div className="sobre-feature-icon">
                                    <FaLayerGroup />
                                </div>

                                <Typography
                                    component="h3"
                                    className="sobre-feature-title"
                                >
                                    Explorar categorias
                                </Typography>

                                <Typography className="sobre-feature-text">
                                    Navegue por diferentes
                                    categorias e descubra
                                    livros relacionados aos
                                    seus interesses.
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card className="sobre-feature-card">
                            <CardContent>
                                <div className="sobre-feature-icon">
                                    <FaHeart />
                                </div>

                                <Typography
                                    component="h3"
                                    className="sobre-feature-title"
                                >
                                    Salvar favoritos
                                </Typography>

                                <Typography className="sobre-feature-text">
                                    Guarde os livros que
                                    mais interessam você
                                    em uma lista de
                                    favoritos.
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* TECNOLOGIAS */}

                <section className="sobre-tech">
                    <Typography
                        component="h2"
                        className="sobre-section-title"
                    >
                        Tecnologias utilizadas
                    </Typography>

                    <div className="sobre-tech-list">
                        <span>React</span>
                        <span>Material UI</span>
                        <span>Axios</span>
                        <span>React Router</span>
                        <span>React Icons</span>
                        <span>Open Library API</span>
                    </div>
                </section>

                {/* AÇÕES */}

                <section className="sobre-actions">
                    <Typography
                        component="h2"
                        className="sobre-action-title"
                    >
                        Comece a explorar
                    </Typography>

                    <Typography className="sobre-action-text">
                        Encontre uma nova história para
                        ler ou descubra seu próximo livro
                        favorito.
                    </Typography>

                    <div className="sobre-buttons">
                        <Button
                            variant="contained"
                            startIcon={<FaBook />}
                            onClick={() =>
                                navigate("/")
                            }
                            className="sobre-button-primary"
                        >
                            Explorar livros
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<FaLayerGroup />}
                            onClick={() =>
                                navigate(
                                    "/categorias"
                                )
                            }
                            className="sobre-button-secondary"
                        >
                            Ver categorias
                        </Button>
                    </div>
                </section>

                {/* OPEN LIBRARY */}

                <div className="sobre-source">
                    <Typography>
                        Dados de livros fornecidos pela
                        Open Library.
                    </Typography>

                    <Button
                        href="https://openlibrary.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={
                            <FaExternalLinkAlt />
                        }
                        className="sobre-source-button"
                    >
                        Open Library
                    </Button>
                </div>
            </Container>
        </main>
    );
}

export default Sobre;