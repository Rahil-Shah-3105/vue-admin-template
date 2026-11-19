<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
	console.error(`>>> Entering statusFilter(status=${status})`, { "event.action": "statusFilter", "logrite.status": status });
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
	console.warn(`<<< Exiting statusFilter(status=${status})`, { "event.action": "statusFilter", "logrite.status": status });
      return statusMap[status]
    }
  },
  data() {
	console.error('>>> Entering data()', { "event.action": "data" });
    return {
      list: null,
      listLoading: true
    }
	console.warn('<<< Exiting data()', { "event.action": "data" });
  },
  created() {
	console.error('>>> Entering created()', { "event.action": "created" });
    this.fetchData()
	console.warn('<<< Exiting created()', { "event.action": "created" });
  },
  methods: {
    fetchData() {
	console.error('>>> Entering fetchData()', { "event.action": "fetchData" });
      this.listLoading = true
      getList().then(response => {
		logger.debug(`fetchData(): this.listLoading → ${this.listLoading}`, { "event.action": "fetchData" });
        this.list = response.data.items
		logger.debug(`fetchData(): this.list → ${this.list}`, { "event.action": "fetchData" });
        this.listLoading = false
		console.warn('<<< Exiting fetchData()', { "event.action": "fetchData" });
      })
    }
  }
}
</script>
