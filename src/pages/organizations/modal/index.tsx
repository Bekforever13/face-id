import { UiButton } from '@/components'
import { useActions } from '@/features/hooks/useActions'
import { useSelectors } from '@/features/hooks/useSelectors'
import { Modal, Form, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import {
  useCreateOrganizationMutation,
  useEditOrganizationMutation,
} from '@/app/store/index.endpoints'
import { UiInput } from '@/components/input/UiInput'
import { FaFileImage } from 'react-icons/fa6'

const OrganizationsModal = () => {
  const [form] = Form.useForm()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const { organizationsModalOpen, organizationToEdit } = useSelectors()
  const { setOrganizationsModalOpen, setOrganizationToEdit } = useActions()
  const [
    createOrganization,
    { isLoading: createLoading, isSuccess: createSuccess },
  ] = useCreateOrganizationMutation()
  const [editOrganization, { isSuccess: editSuccess, isLoading: editLoading }] =
    useEditOrganizationMutation()

  const handleCancel = () => {
    setOrganizationsModalOpen(false)
    setOrganizationToEdit({
      address: '',
      id: 0,
      image: '',
      name: '',
      org: 0,
    })
    form.resetFields()
    setSelectedFile(null)
  }

  const handleOk = () => {
    if (organizationToEdit.id) {
      editOrganization({
        id: organizationToEdit.id,
        name: form.getFieldValue('name'),
        address: form.getFieldValue('address'),
        image: '',
        org: 0,
      })
    } else {
      const formData = new FormData()
      formData.append('images', selectedFile)
      formData.append('name', form.getFieldValue('name'))
      formData.append('address', form.getFieldValue('address'))
      createOrganization(formData)
    }
  }

  useEffect(() => {
    if (createSuccess || editSuccess) {
      setOrganizationsModalOpen(false)
      message.success(editSuccess ? 'Успешно изменено' : 'Успешно создано')
    }
  }, [createSuccess, editSuccess])

  useEffect(() => {
    if (organizationToEdit.id !== 0) {
      form.setFieldValue('name', organizationToEdit.name)
      form.setFieldValue('address', organizationToEdit.address)
    }
  }, [organizationToEdit.id])

  return (
    <Modal
      footer={[
        <Button type="default" key="cancel" onClick={handleCancel}>
          Отмена
        </Button>,
        <UiButton
          loading={createLoading || editLoading}
          onClick={() => form.submit()}
          key="submit"
        >
          Сохранить
        </UiButton>,
      ]}
      title="Новая организация"
      open={organizationsModalOpen}
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
          label="Адрес"
          name="address"
          rules={[{ required: true, message: 'Пожалуйста, введите адрес.' }]}
        >
          <UiInput placeholder="Адрес" />
        </Form.Item>
        {!organizationToEdit.id && (
          <Form.Item
            label="Изображение"
            name="images"
            rules={[
              { required: true, message: 'Пожалуйста, выберите изображение.' },
            ]}
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

export { OrganizationsModal }
