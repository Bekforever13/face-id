import { UiButton } from '@/components'
import { useActions } from '@/features/hooks/useActions'
import { useSelectors } from '@/features/hooks/useSelectors'
import { Modal, Form, Button, message, Select } from 'antd'
import { useEffect, useState } from 'react'
import {
  useCreateGroupMutation,
  useEditGroupMutation,
  useGetAllOrganizationsQuery,
} from '@/app/store/index.endpoints'
import { UiInput } from '@/components/input/UiInput'
import { LabelValue } from '@/shared/types/Types'

const GroupsModal = () => {
  const [form] = Form.useForm()
  const [organizationsOptions, setOrganizationsOptions] = useState<LabelValue[]>([])
  const { groupToEdit, groupsModalOpen } = useSelectors()
  const { setGroupsModalOpen, setGroupsToEdit } = useActions()
  const { data: organizations, isSuccess: organizationSuccess } = useGetAllOrganizationsQuery()
  const [createGroup, { isLoading: createLoading, isSuccess: createSuccess }] =
    useCreateGroupMutation()
  const [editGroup, { isSuccess: editSuccess, isLoading: editLoading }] = useEditGroupMutation()

  const handleCancel = () => {
    setGroupsModalOpen(false)
    setGroupsToEdit({
      id: 0,
      name: '',
      kindergarten_id: 0,
      model_camera: '',
    })
    form.resetFields()
  }

  const handleOk = () => {
    if (groupToEdit.id) {
      editGroup({
        id: groupToEdit.id,
        name: form.getFieldValue('name'),
        kindergarten_id: form.getFieldValue('kindergarten_id'),
        model_camera: form.getFieldValue('model_camera'),
      })
    } else {
      createGroup({
        name: form.getFieldValue('name'),
        kindergarten_id: form.getFieldValue('kindergarten_id'),
        model_camera: form.getFieldValue('model_camera'),
      })
    }
  }

  useEffect(() => {
    if (createSuccess || editSuccess) {
      setGroupsModalOpen(false)
      message.success(editSuccess ? 'Успешно изменено' : 'Успешно создано')
    }
  }, [createSuccess, editSuccess])

  useEffect(() => {
    if (organizations) {
      const mappedOrganizations: LabelValue[] = organizations.data.map((el) => ({
        label: el.name,
        value: el.id,
      }))
      setOrganizationsOptions(mappedOrganizations)
    }
  }, [organizationSuccess])

  useEffect(() => {
    if (groupToEdit.id !== 0) {
      form.setFieldValue('name', groupToEdit.name)
      form.setFieldValue('model_camera', groupToEdit.model_camera)
      form.setFieldValue('kindergarten_id', groupToEdit.kindergarten_id)
    }
  }, [groupToEdit.id])

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
      title="Новая группа"
      open={groupsModalOpen}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={handleOk} layout="vertical">
        <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true, message: 'Пожалуйста, введите название.' }]}
        >
          <UiInput placeholder="Название" />
        </Form.Item>
        <Form.Item
          label="Модель камеры"
          name="model_camera"
          rules={[{ required: true, message: 'Пожалуйста, введите адрес.' }]}
        >
          <UiInput placeholder="Модель камеры" />
        </Form.Item>
        <Form.Item
          label="Организация"
          name="kindergarten_id"
          rules={[{ required: true, message: 'Пожалуйста, введите адрес.' }]}
        >
          <Select placeholder="Выберите" options={organizationsOptions} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export { GroupsModal }
