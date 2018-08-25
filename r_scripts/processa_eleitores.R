# Author:  Italo Medeiros, italo.batista@ccc.ufcg.edu.br
# Last change: 08/2018 
# ------------------------- Entrada -----------------------------
# Recebe como entrada dados do TSE: receitas_candidatos_prestacao_contas_final_<ano>_brasil.csv, onde ano pertence a [2012, 2018]. 
# ------------------------- Saída -------------------------------
# Produz como resultado um arquivo denominado ../data/eleitores.csv que contém o sumário do perfil dos eleitores
# por ano.

library(tidyverse)

setwd("/home/italohmb/Área de Trabalho/hackfest-NNPSAO/nao-nasci-pra-ser-a-outra/")

perfil_eleitorado_2012 = readr::read_csv2(here::here("../data/eleitores/perfil_eleitorado_2012/perfil_eleitorado_2012.csv"), local=readr::locale(encoding="latin1"), col_names = FALSE)
perfil_eleitorado_2014 = readr::read_csv2(here::here("../data/eleitores/perfil_eleitorado_2014/perfil_eleitorado_2014.csv"), local=readr::locale(encoding="latin1"), col_names = FALSE)
perfil_eleitorado_2016 = readr::read_csv2(here::here("../data/eleitores/perfil_eleitorado_2016/perfil_eleitorado_2016.csv"), local=readr::locale(encoding="latin1"), col_names = FALSE)
perfil_eleitorado_ATUAL = readr::read_csv2(here::here("../data/eleitores/perfil_eleitorado_ATUAL/perfil_eleitorado_ATUAL.csv"), local=readr::locale(encoding="latin1"), col_names = FALSE)

eleitores_all = rbind(perfil_eleitorado_2012, perfil_eleitorado_2014)
eleitores_all = rbind(eleitores_all, perfil_eleitorado_2016)
eleitores_all = rbind(eleitores_all, perfil_eleitorado_ATUAL)

colnames(eleitores_all) = c("nome", "uf", "cidade", "x4", "x5", "genero", "faixa_etaria", "escolaridade", "idade")
eleitores_all = eleitores_all %>%
  select(-c("x4", "x5"))

write.csv2(eleitores_all, "..data/eleitores.csv")