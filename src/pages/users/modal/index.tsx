import { UiButton } from '@/components'
import { useActions } from '@/features/hooks/useActions'
import { useSelectors } from '@/features/hooks/useSelectors'
import { Modal, Form, Button, message, Select } from 'antd'
import { useEffect, useState } from 'react'
import {
  useCreateUserMutation,
  useEditUserMutation,
  useGetAllGroupsQuery,
} from '@/app/store/index.endpoints'
import { UiInput } from '@/components/input/UiInput'
import { LabelValue } from '@/shared/types/Types'
import { UploadOutlined } from '@ant-design/icons'
import { FaFileImage } from 'react-icons/fa6'

const UsersModal = () => {
  const [form] = Form.useForm()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [groupsOptions, setGroupsOptions] = useState<LabelValue[]>([])
  const { userToEdit, usersModalOpen } = useSelectors()
  const { setUsersModalOpen, setUsersToEdit } = useActions()
  const { data: groups, isSuccess: groupsSuccess } = useGetAllGroupsQuery(0)
  const [createUser, { isLoading: createLoading, isSuccess: createSuccess }] =
    useCreateUserMutation()
  const [editUser, { isSuccess: editSuccess, isLoading: editLoading }] = useEditUserMutation()

  const handleCancel = () => {
    setUsersModalOpen(false)
    setUsersToEdit({
      id: 0,
      last_name: '',
      first_name: '',
      group_id: 0,
    })
    form.resetFields()
    setSelectedFile(null)
  }

  const handleOk = () => {
    if (userToEdit.id) {
      editUser({
        id: userToEdit.id,
        first_name: form.getFieldValue('first_name'),
        last_name: form.getFieldValue('last_name'),
        group_id: form.getFieldValue('group_id'),
      })
    } else {
      const formData = new FormData()
      formData.append('images[]', selectedFile)
      formData.append('first_name', form.getFieldValue('first_name'))
      formData.append('last_name', form.getFieldValue('last_name'))
      formData.append('group_id', form.getFieldValue('group_id'))

      createUser(formData)
    }
  }

  useEffect(() => {
    if (createSuccess || editSuccess) {
      setUsersModalOpen(false)
      message.success(editSuccess ? 'Успешно изменено' : 'Успешно создано')
    }
  }, [createSuccess, editSuccess])

  useEffect(() => {
    if (groups) {
      const mappedOrganizations: LabelValue[] = groups.data.map((el) => ({
        label: el.name,
        value: el.id,
      }))
      setGroupsOptions(mappedOrganizations)
    }
  }, [groupsSuccess])

  useEffect(() => {
    if (userToEdit.id !== 0) {
      form.setFieldValue('first_name', userToEdit.first_name)
      form.setFieldValue('last_name', userToEdit.last_name)
      form.setFieldValue('group_id', userToEdit.group_id)
      form.setFieldValue('id', userToEdit.id)
    }
  }, [userToEdit.id])

  return (
    <Modal
      footer={[
        <Button type="default" key="cancel" onClick={handleCancel}>
          Отмена
        </Button>,
        <UiButton loading={createLoading || editLoading} onClick={() => form.submit()} key="submit">
          Сохранить
        </UiButton>,
      ]}
      title="Новый пользователь"
      open={usersModalOpen}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleOk} layout="vertical">
        <Form.Item
          label="Имя"
          name="first_name"
          rules={[{ required: true, message: 'Пожалуйста, введите название.' }]}
        >
          <UiInput placeholder="Имя" />
        </Form.Item>
        <Form.Item
          label="Фамилия"
          name="last_name"
          rules={[{ required: true, message: 'Пожалуйста, введите адрес.' }]}
        >
          <UiInput placeholder="Фамилия" />
        </Form.Item>
        <Form.Item
          label="Группа"
          name="group_id"
          rules={[{ required: true, message: 'Пожалуйста, введите адрес.' }]}
        >
          <Select placeholder="Выберите" options={groupsOptions} />
        </Form.Item>
        {userToEdit.id === 0 && (
          <Form.Item
            label="Изображение"
            name="images"
            rules={[{ required: true, message: 'Пожалуйста, выберите изображение.' }]}
          >
            <div>
              <div className="flex items-center gap-2 cursor-pointer">
                <UploadOutlined />
                <label htmlFor="file" className="flex cursor-pointer">
                  Выберите изображение
                  <input
                    type="file"
                    className="opacity-0"
                    id="file"
                    onChange={(e) => setSelectedFile(e?.target?.files?.[0])}
                  />
                </label>
              </div>
              {selectedFile && (
                <span className=" flex items-center gap-2 mt-3">
                  <FaFileImage />
                  {selectedFile?.name}
                </span>
              )}
            </div>
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}

export { UsersModal }
