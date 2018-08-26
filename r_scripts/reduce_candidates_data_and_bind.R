# Author: Italo Medeiros, italo.batista@ccc.ufcg.edu.br
# Last change: 08/2018 
# ------------------------- Entrada -----------------------------
# Recebe como entrada dados do TSE de candidatos preprocessados pelo script X.
# Dados de entrada tem caminho ../data/candidatos/candidatos_<ano>.csv, onde ano pertence a [2000, 2018]. 
# ------------------------- Saída -------------------------------
# Produz como resultado um arquivo denominado ../data/preprocessed/historico.csv que contém o sumário com o número de mulheres candidatas,
# número de mulheres eleitas e número de candidatas com zero votos por ano.

library(tidyverse)
library(stringr)
source(here::here("r_scripts/utils/filters.R"))

# Deleta colunas desnecessárias
dell_cols = function(df) {
  return(df %>%
           select(-c(X1, 
                     nome_coligacao, 
                     nome_urna_candidato, 
                     composicao_legenda, 
                     nome_partido, 
                     descricao_cargo))
  )
}

# Retorna um df contendo informações adicionais como total de candidatas femininas, total de candidatos masculinos,
# total de candidatas fantasmas femininas e total de candidatos masculinos fantasmas.
get_ghost_candidates = function(df) {
  df %>% mutate(
    total_candidate_fem = nrow(df %>% filter_get_candidates_fem),
    total_candidate_masc = nrow(df %>% filter_get_candidates_masc),
    total_ghosts_fem = nrow(df %>% filter_get_candidates_fem %>% filter_ghost_candidates),
    total_ghosts_masc = nrow(df %>% filter_get_candidates_masc %>% filter_ghost_candidates)
  )
}

# Seleciona colunas importantes
finish_clean = function(df) {
  return(df %>% 
           select(ano_eleicao,
                  total_candidate_fem,
                  total_candidate_masc,
                  total_ghosts_fem,
                  total_ghosts_masc))
}

# Realiza o preprocessamento do dataframe
preprocess = function(df) {
  return(df %>%
           filter_desistentes %>%
           dell_cols %>%
           get_ghost_candidates %>% 
           finish_clean %>%
           head(1))
}

preprocess_data <- function(filepath) {
  df <- readr::read_csv2(filepath, local=readr::locale("br"), col_names = FALSE)
  return(preprocess(df))
}

filenames <- list.files(path = here::here("data/preprocessed/candidatos"), recursive = TRUE, full.names = TRUE) 
ans = do.call(rbind, lapply(filenames, read_csv2)) 

a <- lapply(filenames, preprocess_data)

data_2000 = readr::read_csv2(here::here("data/candidatos/candidatos_2000.csv"), local=readr::locale("br"))
data_2002 = readr::read_csv2(here::here("data/candidatos/candidatos_2002.csv"), local=readr::locale("br"))
data_2004 = readr::read_csv2(here::here("data/candidatos/candidatos_2004.csv"), local=readr::locale("br"))
data_2006 = readr::read_csv2(here::here("data/candidatos/candidatos_2006.csv"), local=readr::locale("br"))
data_2008 = readr::read_csv2(here::here("data/candidatos/candidatos_2008.csv"), local=readr::locale("br"))
data_2010 = readr::read_csv2(here::here("data/candidatos/candidatos_2010.csv"), local=readr::locale("br"))
data_2012 = readr::read_csv2(here::here("data/candidatos/candidatos_2012.csv"), local=readr::locale("br"))
data_2014 = readr::read_csv2(here::here("data/candidatos/candidatos_2014.csv"), local=readr::locale("br"))
data_2016 = readr::read_csv2(here::here("data/candidatos/candidatos_2016.csv"), local=readr::locale("br"))

data_2000 = preprocess(data_2000)
data_2002 = preprocess(data_2002)
data_2004 = preprocess(data_2004)
data_2006 = preprocess(data_2006)
data_2008 = preprocess(data_2008)
data_2010 = preprocess(data_2010)
data_2012 = preprocess(data_2012)
data_2014 = preprocess(data_2014)
data_2016 = preprocess(data_2016)

summarize_total_ghost_candidates = rbind(data_2000, data_2002)
summarize_total_ghost_candidates = rbind(summarize_total_ghost_candidates, data_2004)
summarize_total_ghost_candidates = rbind(summarize_total_ghost_candidates, data_2006)
summarize_total_ghost_candidates = rbind(summarize_total_ghost_candidates, data_2008)
summarize_total_ghost_candidates = rbind(summarize_total_ghost_candidates, data_2010)
summarize_total_ghost_candidates = rbind(summarize_total_ghost_candidates, data_2012)
summarize_total_ghost_candidates = rbind(summarize_total_ghost_candidates, data_2014)
summarize_total_ghost_candidates = rbind(summarize_total_ghost_candidates, data_2016)

# Sumariza a proporção de candidatos fantasmas masculinos e femininos
summarize_total_ghost_candidates = summarize_total_ghost_candidates %>%
  mutate(
    porc_ghost_fem = round(
      total_ghosts_fem * 100 / total_candidate_fem,
      3),
    porc_ghost_masc = round(
      total_ghosts_masc * 100 / total_candidate_masc,
      3)
  )

write.csv2(summarize_total_ghost_candidates, "data/preprocessed/historico.csv")
