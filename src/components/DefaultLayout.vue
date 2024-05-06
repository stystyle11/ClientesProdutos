<v-container fluid>
  <v-row class="ma-0">
    <v-col
      :cols="getColunas"
      :md="getMds"
      style="height: 400px"
      :class="['graphColumn', getMargin]"
    >
      <!-- Main content -->
      <h3 class="font-weight-bold">Produtos maior Estoque</h3>
      <v-divider
        width="90%"
        color="primary"
        style="margin-bottom: 2rem"
      ></v-divider>
      <ChartComponent
        v-if="arrayGrafico10QuantidadeProdutos.length == 10"
        label="Quantidade / Produto"
        :graphData="arrayGrafico10QuantidadeProdutos"
        :labels="arrayGrafico10NomeProdutos"
      />
    </v-col>

    <v-col
      :cols="getColunas"
      :md="getMds"
      style="height: 400px"
      :class="['graphColumn', getMargin]"
    >
      <!-- Main content -->
      <h3 class="font-weight-bold">Produtos Zerados</h3>
      <v-divider
        width="90%"
        color="primary"
        style="margin-bottom: 2rem"
      ></v-divider>
      <ChartComponent
        v-if="arrayGraficoNomeProdutosZerados.length > 1"
        label="Quantidade / Produto"
        :graphData="arrayGraficoNomeProdutosZerados"
        :labels="arrayGraficoDataProdutosZerados"
      />
    </v-col>
    <v-col
      cols="12"
      md="6"
      style="height: 200px"
    >
      <v-card
        class="elevation-2 rounded-lg mt-12"
        style="width: 100%"
      >
        <v-card-title class="text-center"
          >Produtos cadastrados:</v-card-title
        >
        <v-card-text class="text-center">
          <v-icon size="48">{{
            $store.state.produtos.produtos.length
          }}</v-icon>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      md="6"
      style="height: 200px"
    >
      <v-card
        class="elevation-2 rounded-lg mt-12"
        style="width: 100%"
      >
        <v-card-title class="text-center"
          >Clientes cadastrados:</v-card-title
        >
        <v-card-text class="text-center">
          <v-icon size="48">{{
            $store.state.clientes.clientes.length
          }}</v-icon>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>
