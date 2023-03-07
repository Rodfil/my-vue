<template>
  <div>
    <!-- Body Card -->
    <el-card shadow="hover" class="menuCard">
      <el-table :data="listOfAbout" style="width: 100%">
        <el-table-column label="Description" prop="description" />
        <el-table-column align="right">
          <template #header>
            <el-button @click="createAboutVisible = true" type="primary"
              >Add</el-button
            >
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >Edit</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

  <div>
    <el-dialog v-model="createAboutVisible" title="Enter Description">
      <el-form :model="form">
        <el-form-item label="Description:" :label-width="formLabelWidth">
          <el-input
            v-model="form.description"
            :autosize="{ minRows: 5, maxRows: 10 }"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createAboutVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="form.aboutId ? editAbout() : addAbout(form)"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>

  <div>
    <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
      <span text-align="center"
        >Are you sure you want to delete this user?</span
      >
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="deleteAbout()">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import api from "@/services/apiService";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "View1",
  data() {
    return {
      loading: false,
      errorLoading: false,
      listOfAbout: null,

      form: reactive({
        aboutId: null,
        description: "",
      }),

      createAboutVisible: false,
      centerDialogVisible: false,
    };
  },
  methods: {
    async getAbout() {
      api
        .get("/About")
        .then((response) => {
          console.log(this.listOfAbout);
          this.listOfAbout = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async addAbout(about) {
      api
        .post("/About/", about)
        .then(() => {
          this.createAboutVisible = false;
          ElMessage.success("About Description successfully created.");
          this.form = {
            description: "",
          };
          this.getAbout();
        })
        .catch(() => {
          ElMessage.error("Error fetching data from the server.");
        });
    },

    async handleEdit(row) {
      this.createAboutVisible = true;
      this.form.aboutId = row.aboutId;
      this.form.description = row.description;
    },

    async editAbout() {
      api
        .put(`About/${this.form.aboutId}`, {
          aboutId: this.form.aboutId,
          description: this.form.description,
        })
        .then(() => {
          this.createAboutVisible = false;
          ElMessage.success("About Description successfully updated.");
          this.form = {
            description: "",
          };
          this.getAbout();
        })
        .catch(() => {
          ElMessage.error("Error fetching data from the server.");
        });
    },

    async handleDelete(row) {
      this.centerDialogVisible = true;
      this.row = row;
    },

    async deleteAbout() {
      this.form.aboutId = this.row.aboutId;
      api
        .delete(`About/${this.form.aboutId}`)
        .then(() => {
          this.centerDialogVisible = false;
          ElMessage.success("Successfully deleted!");
          this.getAbout();
        })
        .catch(() => {
          ElMessage.error("Error fetching data from the server.");
        });
    },
  },
  created() {
    this.getAbout();
  },
});
</script>

<style lang="scss" scoped>
.item {
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.menuCard {
  min-height: 50vh;
  max-height: calc(92vh - 32px);
  overflow: hidden;
}

.tableContent {
  max-height: calc(82vh - 32px);
  overflow: auto;
}

.bodyContent {
  padding-top: 0.5rem;
}
.newButton {
  text-align: end;
}
</style>
