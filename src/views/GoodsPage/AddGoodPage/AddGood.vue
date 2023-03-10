<template>
	<div id="add_good">
		<div class="add_good_header_info">
			<div><i class="el-icon-info">添加商品信息</i></div>
		</div>
		<el-container>
			<el-header class="step_header">
				<!-- step步骤条 -->
				<el-steps :active="activeIndex - 0" finish-status="success">
					<el-step title="基本信息"></el-step>
					<el-step title="商品参数"></el-step>
					<el-step title="商品属性"></el-step>
					<el-step title="商品图片"></el-step>
					<el-step title="商品内容"></el-step>
					<el-step title="完成"></el-step>
				</el-steps>
			</el-header>
			<el-main>
				<!-- 基本信息 -->
				<el-form ref="form" :model="addGoodFrom" label-position="top" :rules="rules">
					<el-tabs
						v-model="activeIndex"
						tab-position="left"
						:before-leave="changeTab"
						@tab-click="tabChecked"
					>
						<el-tab-pane label="基本信息" name="0">
							<el-form-item label="商品名称" prop="goods_name">
								<el-input v-model="addGoodFrom.goods_name"></el-input>
							</el-form-item>
							<el-form-item label="商品价格" prop="goods_price">
								<el-input v-model="addGoodFrom.goods_price" type="number"></el-input>
							</el-form-item>
							<el-form-item label="商品数量" prop="goods_number">
								<el-input v-model="addGoodFrom.goods_number" type="number"></el-input>
							</el-form-item>
							<el-form-item label="商品重量" prop="goods_weight">
								<el-input v-model="addGoodFrom.goods_weight" type="number"></el-input>
							</el-form-item>
							<el-form-item label="商品分类" prop="goods_cat">
								<!-- 商品分类联级选择器 -->
								<el-cascader
									v-model="addGoodFrom.goods_cat"
									:options="region"
									:props="cascaderOption"
									@change="handleChange"
								></el-cascader>
							</el-form-item>
						</el-tab-pane>
						<el-tab-pane label="商品参数" name="1">
							<!-- 商品参数多选框组 -->
							<!-- 第一次循环渲染有几个选项组 -->
							<el-form-item :label="item.attr_name" v-for="item in manyData" :key="item.attr_id">
								<el-checkbox-group v-model="item.attr_vals">
									<!-- 第二次循环渲染得到选项组中的可选项 -->
									<el-checkbox
										:label="item"
										border
										v-for="(item, index) in item.attr_vals"
										:key="index"
									></el-checkbox>
								</el-checkbox-group>
							</el-form-item>
						</el-tab-pane>
						<el-tab-pane label="商品属性" name="2">
							<!-- 商品属性渲染 -->
							<el-form-item :label="item.attr_name" v-for="item in onlyData" :key="item.id">
								<el-input v-model="item.attr_vals"></el-input>
							</el-form-item>
						</el-tab-pane>
						<el-tab-pane label="商品图片" name="3">
							<!-- 图片上传组件 -->
							<el-upload
								:action="action"
								:on-preview="handlePreview"
								:on-remove="handleRemove"
								list-type="picture"
								:headers="upLoadHeaders"
								:on-success="upLoadSuccess"
							>
								<el-button size="small" type="primary">点击上传</el-button>
							</el-upload>
							<!-- 图片预览dialog -->
							<el-dialog
								title="图片预览"
								:visible.sync="ImagePreviewDialogState"
								:before-close="handleClose"
							>
								<el-image :src="imagePreviewUrl" fit="fill"></el-image>
							</el-dialog>
						</el-tab-pane>
						<el-tab-pane label="商品内容" name="4">
							<!-- 富文本编辑器 -->
							<quill-editor
								v-model="addGoodFrom.goods_introduce"
								ref="myQuillEditor"
								:options="editorOption"
								@blur="onEditorBlur($event)"
								@focus="onEditorFocus($event)"
								@change="onEditorChange($event)"
							></quill-editor>
							<el-button type="primary" class="add_goods_btn" @click="addGood">添加商品</el-button>
						</el-tab-pane>
					</el-tabs>
				</el-form>
			</el-main>
		</el-container>
	</div>
</template>
<script>
	import instance from "@/http/request";
	import _ from "lodash";

	export default {
		name: "AddGood",
		data() {
			return {
				editorOption: {},
				//当前被选择的Tab和步骤条的index
				activeIndex: "0",
				//基本信息表单数据
				addGoodFrom: {
					goods_name: "",
					goods_cat: [],
					goods_price: "",
					goods_number: "",
					goods_weight: "",
					goods_introduce: "",
					//商品分类选择器值,值为被选择选项的id
					pics: [],
					attrs: [],
				},
				//商品分类数据联级选择器数据源
				region: [],
				//选择商品分类联级选择器配置
				cascaderOption: {
					//hover触发子类
					expandTrigger: "hover",
					//被选择的值
					value: "cat_id",
					//显示标题
					label: "cat_name",
					//子类关键字
					children: "children",
				},
				// 商品参数多选框组数据源
				manyData: [],
				//商品属性数据源
				onlyData: [],
				//图片上传的地址
				action: "http://127.0.0.1:8888/api/private/v1/upload",
				//上传图片组件token
				upLoadHeaders: {
					Authorization: localStorage.getItem("Token"),
				},
				//图片预览的对话框状态
				ImagePreviewDialogState: false,
				//图片预览的url
				imagePreviewUrl: "",
				//表单验证规则
				rules: {
					goods_name: [{ required: true, message: "请填写商品名称", trigger: "blur" }],
					goods_price: [{ required: true, message: "请填写商品价格", trigger: "blur" }],
					goods_number: [{ required: true, message: "请填写商品数量", trigger: "blur" }],
					goods_weight: [{ required: true, message: "请填写商品重量", trigger: "blur" }],
					goods_cat: [{ required: true, message: "请选择商品分类", trigger: "blur" }],
				},
			};
		},
		computed: {
			cateId() {
				if (this.addGoodFrom.goods_cat.length === 3) {
					return this.addGoodFrom.goods_cat[2];
				} else {
					return null;
				}
			},
		},
		methods: {
			addGood() {
				this.$refs.form.validate( async valid => {
					if (!valid) return this.$message.error("请填写必要的选项");
					const cloneObj = _.cloneDeep(this.addGoodFrom);
					cloneObj.goods_cat = _.join(cloneObj.goods_cat, ",");
					const {data,meta} = await instance.post('/goods',cloneObj);
				});
			},
			onEditorBlur() {},
			onEditorFocus() {
				//获得焦点事件
			},
			onEditorChange() {
				//内容改变事件
			},
			//文件上传成功时的钩子
			upLoadSuccess(res, file) {
				const { data, meta } = res;
				if (meta.status !== 200) return this.$message.error("上传失败");
				this.$message.success(meta.msg);
				const picInfo = { pic: data.tmp_path };
				this.addGoodFrom.pics.push(picInfo);
			},
			//图片移除操作
			handleRemove(file, fileList) {
				//获取移除图片的临时路径
				const filePath = file.response.data.tmp_path;
				//获取此图片在pics数组中的索引值
				const removePicIndex = this.addGoodFrom.pics.findIndex(x => (x.pic = filePath));
				//删除此项数据
				this.addGoodFrom.pics.splice(removePicIndex, 1);
				console.log(this.addGoodFrom);
			},
			//处理图片预览效果
			handlePreview(file) {
				this.imagePreviewUrl = file.response.data.url;
				this.ImagePreviewDialogState = true;
				console.log(file);
			},
			//图片预览窗口关闭之前的回调函数
			handleClose(done) {
				done();
			},
			//点击tag标签触发的事件
			async tabChecked() {
				//当activeIndex为一时就是点击了参数详情面板,发起请求获取商品参数
				if (this.activeIndex === "1") {
					// console.log(this.cateId,this.addGoodFrom.goods_cat)
					const { data, meta } = await instance.get(`categories/${this.cateId}/attributes`, {
						params: { sel: "many" },
					});
					if (meta.status !== 200) return this.$message.error(meta.msg);
					//获取到的数据是以','分割的字符串，将其转换为数组在页面动态渲染
					data.forEach(item => {
						item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(",");
					});
					//将其赋值给goodParms动态渲染
					this.manyData = data;
					// console.log(data, meta);
				} else if (this.activeIndex === "2") {
					//如果activeIndex为2就是点击了商品属性面板
					//发起请求获取数据
					const { data, meta } = await instance.get(`categories/${this.cateId}/attributes`, {
						params: { sel: "only" },
					});
					if (meta.status !== 200) return this.$message.error(meta.msg);
					this.onlyData = data;
					// console.log(data, meta);
				}
				// console.log(this.activeIndex);
			},
			//切换tab栏时对当前表单进行验证，并更新当前步骤条状态
			changeTab(toTab, leaveTab) {
				// console.log(`即将离开的Tab${leaveTab},即将要去的Tab${toTab}`);
				//当即将离开的tag标签为0时就是离开基本信息面板
				if (leaveTab === "0") {
					//当goods_cat长度为0时就是空,阻止跳转,提醒用户选择商品分类
					if (this.addGoodFrom.goods_cat.length === 0) {
						this.$message.error("请选择商品分类");
						return false;
					}
				}
				return true;
			},
			//联级选择器的值改变时触发的事件
			handleChange() {
				//如果没有选择第三级就清空数组，
				if (this.addGoodFrom.goods_cat.length !== 3) {
					this.addGoodFrom.goods_cat = [];
				}
			},

			/* 			next() {
				if (this.activeIndex++ > 5) this.active = 0;
			}, */
			//获取商品分类列表，并渲染到联级选择器
			async getCategoryList() {
				const { data, meta } = await instance.get("/categories");
				if (meta.status !== 200) return this.$message.error(meta.msg);
				this.region = data;
			},
		},
		created() {
			//在创建组件时获取商品分类列表
			this.getCategoryList();
		},
	};
</script>
<style scoped>
	#add_good {
		background: white;
		border-radius: 10px;
		padding: 20px;
	}
	.add_good_header_info {
		height: 40px;
		text-align: center;
		line-height: 40px;
		background: #f4f4f5;
	}
	.step_header {
		margin-top: 20px;
	}
	.quill-editor {
		height: 200px !important;
	}
	.add_goods_btn {
		margin-top: 80px;
	}
</style>
