# Author: Jair Neto, jair.neto@ccc.ufcg.edu.br
# Last change: 08/2018 
# ------------------------- Entrada -----------------------------
# Recebe como entrada dados do TSE: receitas_candidatos_prestacao_contas_final_<ano>_brasil.csv, onde ano pertence a [2000, 2018]. 
# ------------------------- Saída -------------------------------
# TODO

library(tidyverse)
library(data.table)

receitas_candidatos_2016 <- readr::read_csv2(here::here("data/prestacao_brasil/receitas_candidatos_prestacao_contas_final_2016_brasil.csv"),
                                             local=readr::locale(encoding="latin1"))
receitas_candidatos_2014 <- readr::read_csv2(here::here("data/prestacao_final_2014/receitas_candidatos_2014_brasil.csv"),
                                             local=readr::locale(encoding="latin1"))
all_munzona_candidatos_data <- readr::read_csv2(here::here("all_munzona_candidatos_2016.csv"),
                                                local=readr::locale(encoding="latin1"))

generos_2016 <- readr::read_csv(here::here("data/generos_processados/genero_2016.csv"))

formata_colunas_receitas <- function(receitas) {
  to_underscore <- function(x) {
    gsub('([A-Za-z])([A-Z])([a-z])', '\\1_\\2\\3', x) %>%
      gsub('\\s+', '_', .) %>%
      gsub('.', '_', ., fixed = TRUE) %>%
      gsub('([a-z])([A-Z])', '\\1_\\2', .) %>%
      tolower()
  }
  
  new_names = names(receitas) %>%
    to_underscore()
  
  new_names
}

names(receitas_candidatos_2014) <- formata_colunas_receitas(receitas_candidatos_2014)
names(receitas_candidatos_2016) <- formata_colunas_receitas(receitas_candidatos_2016)

#Quanto cada candidato teve de receita
receitas_por_candidatos <- 
  receitas_candidatos_2016 %>%
  rename("numero_cand" = "numero_candidato") %>%
  dplyr::group_by(cpf_do_candidato, nome_candidato, numero_cand) %>%
  summarise(verba_por_candidato = sum(valor_receita)) 

#Quanto cada candidato teve de receita dada pelo partido
receitas_por_candidatos_dadas_pelo_partido <-
  receitas_candidatos_2016 %>%
  filter(tipo_receita == "Recursos de partido político") %>%
  rename("numero_cand" = "numero_candidato") %>%
  dplyr::group_by(cpf_do_candidato, nome_candidato, numero_cand) %>%
  summarise(verba_por_candidato = sum(valor_receita)) 

receitas_por_candidatos <- data.table(receitas_por_candidatos)
all_munzona_candidatos_data <- data.table(all_munzona_candidatos_data)
receitas_por_candidatos_dadas_pelo_partido <- data.table(receitas_por_candidatos_dadas_pelo_partido)
generos_2016 <- 
  generos_2016 %>%
  select(-c(sigla_uf, des_situacao_candidatura)) %>%
  data.table()

receitas_por_candidatos_merged <- 
  merge(receitas_por_candidatos, all_munzona_candidatos_data, by = c("numero_cand", "nome_candidato"))
receitas_por_candidatos_merged <-
  merge(receitas_por_candidatos_merged, generos_2016, by = c("numero_cand", "nome_municipio", "descricao_cargo"))
receitas_por_candidatos_dadas_pelo_partido_merged <-
  merge(receitas_por_candidatos_dadas_pelo_partido, all_munzona_candidatos_data, by = c("numero_cand", "nome_candidato"))
receitas_por_candidatos_dadas_pelo_partido_merged <-
  merge(receitas_por_candidatos_dadas_pelo_partido_merged, generos_2016, by = c("numero_cand", "nome_municipio", "descricao_cargo"))

write_csv(receitas_por_candidatos_merged, "receitas_por_candidato_merged_2016.csv")
write.csv(receitas_por_candidatos_dadas_pelo_partido_merged, "receitas_por_candidatos_dadas_pelo_partido_merged_2016.csv")
