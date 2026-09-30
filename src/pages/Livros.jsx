import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    Alert,
    Chip,
} from "@mui/material";

import {
    FaBook,
    FaSearch,
    FaExternalLinkAlt,
    FaHeart,
} from "react-icons/fa";

import api from "../services/api";

function Livros() {
    const [searchParams] = useSearchParams();

    const categoria = searchParams.get("categoria");

    const [livros, setLivros] = useState([]);
    const [termo, setTermo] = useState(
        categoria || "programação"
    );
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    // ============================================================
    // BUSCAR LIVROS AO ABRIR A PÁGINA
    // ============================================================

    useEffect(() => {
        if (categoria) {
            setTermo(categoria);
            buscarLivros(categoria);
        } else {
            buscarLivros("programação");
        }
    }, [categoria]);

    // ============================================================
    // BUSCAR LIVROS NA OPEN LIBRARY
    // ============================================================

    async function buscarLivros(busca) {
        if (!busca || !busca.trim()) {
            return;
        }

        try {
            setCarregando(true);
            setErro("");

            console.log("Buscando livros:", busca);

            const resposta = await api.get("/search.json", {
                params: {
                    q: busca,
                    limit: 20,
                    language: "por",
                },
            });

            console.log(
                "Resposta da Open Library:",
                resposta.data
            );

            setLivros(resposta.data.docs || []);
        } catch (error) {
            console.error(
                "ERRO COMPLETO DA API:",
                error
            );

            if (error.response) {
                console.error(
                    "Status:",
                    error.response.status
                );

                console.error(
                    "Dados:",
                    error.response.data
                );

                setErro(
                    `Erro da API: ${error.response.status}`
                );
            } else if (error.request) {
                console.error(
                    "A API não respondeu."
                );

                setErro(
                    "A API não respondeu. Verifique sua conexão com a internet."
                );
            } else {
                console.error(
                    "Erro:",
                    error.message
                );

                setErro(
                    `Erro: ${error.message}`
                );
            }

            setLivros([]);
        } finally {
            setCarregando(false);
        }
    }

    // ============================================================
    // REALIZAR BUSCA
    // ============================================================

    function handleSubmit(event) {
        event.preventDefault();

        buscarLivros(termo);
    }

    // ============================================================
    // FAVORITOS
    // ============================================================

    function adicionarFavorito(livro) {
        const favoritos =
            JSON.parse(
                localStorage.getItem(
                    "bookflix_favoritos"
                )
            ) || [];

        const existe = favoritos.some(
            (item) => item.key === livro.key
        );

        if (existe) {
            const novosFavoritos =
                favoritos.filter(
                    (item) => item.key !== livro.key
                );

            localStorage.setItem(
                "bookflix_favoritos",
                JSON.stringify(novosFavoritos)
            );
        } else {
            favoritos.push(livro);

            localStorage.setItem(
                "bookflix_favoritos",
                JSON.stringify(favoritos)
            );
        }

        setLivros([...livros]);
    }

    // ============================================================
    // VERIFICAR FAVORITO
    // ============================================================

    function ehFavorito(key) {
        const favoritos =
            JSON.parse(
                localStorage.getItem(
                    "bookflix_favoritos"
                )
            ) || [];

        return favoritos.some(
            (item) => item.key === key
        );
    }

    // ============================================================
    // IMAGEM DA CAPA
    // ============================================================

    function imagemLivro(livro) {
        if (livro.cover_i) {
            return `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`;
        }

        return "https://via.placeholder.com/300x450?text=Sem+Capa";
    }

    // ============================================================
    // AUTORES
    // ============================================================

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

    // ============================================================
    // ANO DE PUBLICAÇÃO
    // ============================================================

    function anoPublicacao(livro) {
        return (
            livro.first_publish_year ||
            "Ano desconhecido"
        );
    }

    // ============================================================
    // CATEGORIA
    // ============================================================

    function categoriaLivro(livro) {
        if (
            livro.subject &&
            livro.subject.length > 0
        ) {
            return livro.subject[0];
        }

        return "Livro";
    }

    // ============================================================
    // ABRIR LIVRO NA OPEN LIBRARY
    // ============================================================

    function abrirLivro(livro) {
        if (!livro.key) {
            return;
        }

        const url = `https://openlibrary.org${livro.key}`;

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );
    }

    // ============================================================
    // INTERFACE
    // ============================================================

    return (
        <Container
            maxWidth="xl"
            sx={{
                py: {
                    xs: 4,
                    md: 7,
                },
            }}
        >
            {/* ================================================= */}
            {/* CABEÇALHO */}
            {/* ================================================= */}

            <Box
                sx={{
                    textAlign: "center",
                    mb: 5,
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: {
                            xs: "34px",
                            md: "48px",
                        },
                        mb: 1,
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            color: "secondary.main",
                        }}
                    >
                        Descubra
                    </Box>{" "}
                    novos livros
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{
                        maxWidth: 700,
                        mx: "auto",
                        fontSize: "17px",
                    }}
                >
                    Encontre livros, autores e histórias
                    através da Open Library.
                </Typography>
            </Box>

            {/* ================================================= */}
            {/* PESQUISA */}
            {/* ================================================= */}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    maxWidth: 850,
                    mx: "auto",
                    mb: 6,
                    display: "flex",
                    gap: 1.5,

                    "@media (max-width:600px)": {
                        flexDirection: "column",
                    },
                }}
            >
                <TextField
                    fullWidth
                    value={termo}
                    onChange={(event) =>
                        setTermo(event.target.value)
                    }
                    placeholder="Digite o nome de um livro, autor ou assunto..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FaSearch color="#D7A86E" />
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={carregando}
                    sx={{
                        minWidth: 130,
                        bgcolor: "secondary.main",
                        color: "#17120F",

                        "&:hover": {
                            bgcolor: "#E5B97E",
                        },
                    }}
                >
                    Buscar
                </Button>
            </Box>

            {/* ================================================= */}
            {/* TÍTULO */}
            {/* ================================================= */}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 3,
                }}
            >
                <FaBook
                    color="#D7A86E"
                    size={22}
                />

                <Typography
                    variant="h4"
                    sx={{
                        fontSize: {
                            xs: "24px",
                            md: "30px",
                        },
                    }}
                >
                    Livros encontrados
                </Typography>
            </Box>

            {/* ================================================= */}
            {/* ERRO */}
            {/* ================================================= */}

            {erro && (
                <Alert
                    severity="error"
                    sx={{
                        mb: 4,
                        borderRadius: 2,
                    }}
                >
                    {erro}
                </Alert>
            )}

            {/* ================================================= */}
            {/* CARREGANDO */}
            {/* ================================================= */}

            {carregando && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        py: 8,
                    }}
                >
                    <CircularProgress
                        color="secondary"
                    />
                </Box>
            )}

            {/* ================================================= */}
            {/* LIVROS */}
            {/* ================================================= */}

            {!carregando &&
                livros.length > 0 && (
                    <Grid
                        container
                        spacing={3}
                    >
                        {livros.map((livro, index) => {
                            const favorito =
                                ehFavorito(livro.key);

                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={
                                        livro.key ||
                                        index
                                    }
                                >
                                    <Card
                                        sx={{
                                            height: "100%",
                                            display:
                                                "flex",
                                            flexDirection:
                                                "column",
                                            overflow:
                                                "hidden",
                                        }}
                                    >
                                        {/* ========================== */}
                                        {/* CAPA */}
                                        {/* ========================== */}

                                        <Box
                                            sx={{
                                                height: 320,
                                                bgcolor:
                                                    "#0E0C0B",
                                                display:
                                                    "flex",
                                                justifyContent:
                                                    "center",
                                                alignItems:
                                                    "center",
                                                position:
                                                    "relative",
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={imagemLivro(
                                                    livro
                                                )}
                                                alt={
                                                    livro.title ||
                                                    "Capa do livro"
                                                }
                                                sx={{
                                                    height:
                                                        "100%",
                                                    width:
                                                        "100%",
                                                    objectFit:
                                                        "contain",
                                                    p: 2,
                                                }}
                                            />

                                            {/* FAVORITO */}

                                            <IconButton
                                                onClick={() =>
                                                    adicionarFavorito(
                                                        livro
                                                    )
                                                }
                                                sx={{
                                                    position:
                                                        "absolute",
                                                    top: 12,
                                                    right: 12,
                                                    bgcolor:
                                                        "rgba(0,0,0,0.65)",
                                                    color:
                                                        favorito
                                                            ? "#D7A86E"
                                                            : "#FFF",

                                                    "&:hover": {
                                                        bgcolor:
                                                            "rgba(0,0,0,0.85)",
                                                    },
                                                }}
                                            >
                                                <FaHeart />
                                            </IconButton>
                                        </Box>

                                        {/* ========================== */}
                                        {/* INFORMAÇÕES */}
                                        {/* ========================== */}

                                        <CardContent
                                            sx={{
                                                display:
                                                    "flex",
                                                flexDirection:
                                                    "column",
                                                flex: 1,
                                            }}
                                        >
                                            {/* CATEGORIA / ANO */}

                                            <Box
                                                sx={{
                                                    display:
                                                        "flex",
                                                    gap: 1,
                                                    flexWrap:
                                                        "wrap",
                                                    mb: 1.5,
                                                }}
                                            >
                                                <Chip
                                                    label={categoriaLivro(
                                                        livro
                                                    )}
                                                    size="small"
                                                    sx={{
                                                        maxWidth:
                                                            "100%",
                                                        bgcolor:
                                                            "rgba(215,168,110,0.12)",
                                                        color:
                                                            "secondary.main",
                                                    }}
                                                />

                                                <Chip
                                                    label={anoPublicacao(
                                                        livro
                                                    )}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Box>

                                            {/* TÍTULO */}

                                            <Typography
                                                variant="h6"
                                                fontWeight={
                                                    800
                                                }
                                                sx={{
                                                    mb: 1,
                                                    lineHeight:
                                                        1.25,
                                                }}
                                            >
                                                {livro.title ||
                                                    "Título não disponível"}
                                            </Typography>

                                            {/* AUTOR */}

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color:
                                                        "secondary.main",
                                                    fontWeight:
                                                        700,
                                                    mb: 1.5,
                                                }}
                                            >
                                                {autores(
                                                    livro
                                                )}
                                            </Typography>

                                            {/* DESCRIÇÃO */}

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    lineHeight:
                                                        1.5,
                                                    mb: 3,
                                                }}
                                            >
                                                Livro disponível
                                                na biblioteca
                                                digital Open
                                                Library.
                                            </Typography>

                                            {/* BOTÃO */}

                                            <Box
                                                sx={{
                                                    mt: "auto",
                                                }}
                                            >
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
                                                    sx={{
                                                        bgcolor:
                                                            "secondary.main",
                                                        color:
                                                            "#17120F",

                                                        "&:hover": {
                                                            bgcolor:
                                                                "#E5B97E",
                                                        },
                                                    }}
                                                >
                                                    Ver livro
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                )}

            {/* ================================================= */}
            {/* NENHUM LIVRO */}
            {/* ================================================= */}

            {!carregando &&
                !erro &&
                livros.length === 0 && (
                    <Box
                        sx={{
                            textAlign: "center",
                            py: 8,
                        }}
                    >
                        <FaBook
                            size={50}
                            color="#8D6E63"
                        />

                        <Typography
                            variant="h5"
                            sx={{
                                mt: 2,
                            }}
                        >
                            Nenhum livro encontrado
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{
                                mt: 1,
                            }}
                        >
                            Tente realizar outra busca.
                        </Typography>
                    </Box>
                )}
        </Container>
    );
}

export default Livros;